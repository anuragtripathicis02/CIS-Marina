import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ITelemetryIngestionPayload, MetricType, TelemetryQuality } from '@yacht-platform/types';
import { Subject } from 'rxjs';

export interface TelemetryStreamEvent {
  deviceId: string;
  yachtId: string;
  organizationId: string;
  timestamp: string;
  metrics: { metricType: MetricType; value: number; unit: string }[];
}

@Injectable()
export class TelemetryIngestionService {
  public static readonly telemetryStream$ = new Subject<TelemetryStreamEvent>();

  constructor(private readonly prisma: PrismaService) {}

  async ingestTelemetry(payload: ITelemetryIngestionPayload) {
    if (!payload.deviceId) {
      throw new BadRequestException('deviceId is required for telemetry ingestion');
    }

    let organizationId = 'org-1';
    let yachtId = 'y1';

    if (this.prisma.isOperational()) {
      const device = await this.prisma.device.findUnique({
        where: { id: payload.deviceId },
        include: { yacht: true },
      });

      if (!device) {
        throw new UnauthorizedException(`Device #${payload.deviceId} is not registered in the system`);
      }

      organizationId = device.organizationId;
      yachtId = device.yachtId || 'y1';

      // Idempotency Check (Requirement 49)
      if (payload.eventId) {
        const existingEvent = await this.prisma.telemetryRecord.findFirst({
          where: { eventId: payload.eventId },
        });
        if (existingEvent) {
          return { success: true, ingestedCount: 0, message: 'Duplicate eventId ignored' };
        }
      }

      // Update Device Last Seen & Active status
      await this.prisma.device.update({
        where: { id: payload.deviceId },
        data: {
          lastSeenAt: new Date(),
          status: 'ACTIVE',
        },
      });

      // Normalize & Batch Insert Telemetry Records
      const recordsToCreate = payload.metrics.map((m) => {
        let normalizedValue = m.value;
        let unit = m.unit || 'unit';

        // Manufacturer Normalization Rules (Requirement 16)
        if (m.metricType === MetricType.FUEL_LEVEL && m.value <= 1.0) {
          normalizedValue = m.value * 100; // Convert 0.74 -> 74%
          unit = '%';
        }

        return {
          organizationId,
          yachtId,
          deviceId: payload.deviceId,
          timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
          metricType: m.metricType,
          value: normalizedValue,
          unit,
          quality: m.quality || TelemetryQuality.GOOD,
          source: 'ingestion-api',
          eventId: payload.eventId,
        };
      });

      await this.prisma.telemetryRecord.createMany({
        data: recordsToCreate,
      });
    }

    // Broadcast Real-Time SSE Stream Event (Requirement 34)
    TelemetryIngestionService.telemetryStream$.next({
      deviceId: payload.deviceId,
      yachtId,
      organizationId,
      timestamp: payload.timestamp || new Date().toISOString(),
      metrics: payload.metrics.map((m) => ({
        metricType: m.metricType,
        value: m.metricType === MetricType.FUEL_LEVEL && m.value <= 1.0 ? m.value * 100 : m.value,
        unit: m.unit || 'unit',
      })),
    });

    return {
      success: true,
      ingestedCount: payload.metrics.length,
      timestamp: payload.timestamp || new Date().toISOString(),
    };
  }
}
