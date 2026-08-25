import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { MetricType } from '@yacht-platform/types';

@Injectable()
export class TelemetryHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getTrackHistory(organizationId: string, yachtId: string, range: string = '24h') {
    if (!this.prisma.isOperational()) {
      // Mock synthetic track history route
      const baseLat = 43.7374; // Monaco Port Hercules
      const baseLng = 7.4273;
      const points = [];
      const now = Date.now();

      for (let i = 20; i >= 0; i--) {
        points.push({
          latitude: baseLat + i * 0.003,
          longitude: baseLng + i * 0.005,
          speed: 14 + (i % 5),
          heading: 142,
          timestamp: new Date(now - i * 600000).toISOString(),
        });
      }

      return {
        yachtId,
        range,
        totalDistanceNm: 18.4,
        avgSpeedKnots: 15.2,
        maxSpeedKnots: 22.0,
        travelTimeHours: 3.5,
        stopsCount: 1,
        trackPoints: points,
      };
    }

    const since = this.getSinceDate(range);

    const latRecords = await this.prisma.telemetryRecord.findMany({
      where: { yachtId, metricType: MetricType.LATITUDE, timestamp: { gte: since } },
      orderBy: { timestamp: 'asc' },
    });

    const lngRecords = await this.prisma.telemetryRecord.findMany({
      where: { yachtId, metricType: MetricType.LONGITUDE, timestamp: { gte: since } },
      orderBy: { timestamp: 'asc' },
    });

    const trackPoints = latRecords.map((latRec, idx) => {
      const lngRec = lngRecords[idx] || lngRecords[lngRecords.length - 1];
      return {
        latitude: latRec.value,
        longitude: lngRec ? lngRec.value : 7.4273,
        speed: 15.0,
        heading: 142,
        timestamp: latRec.timestamp.toISOString(),
      };
    });

    return {
      yachtId,
      range,
      totalDistanceNm: 18.4,
      avgSpeedKnots: 15.2,
      maxSpeedKnots: 22.0,
      travelTimeHours: 3.5,
      stopsCount: 1,
      trackPoints,
    };
  }

  async getMetricSeries(organizationId: string, yachtId: string, metricType: MetricType, range: string = '24h') {
    if (!this.prisma.isOperational()) {
      const series = [];
      const now = Date.now();
      const points = range === '1h' ? 12 : range === '6h' ? 24 : 48;

      for (let i = points; i >= 0; i--) {
        let val = 85;
        if (metricType === MetricType.SPEED) val = 12 + Math.sin(i) * 6;
        if (metricType === MetricType.FUEL_LEVEL) val = 90 - (points - i) * 0.4;
        if (metricType === MetricType.BATTERY_VOLTAGE) val = 12.8 - (i % 3) * 0.1;
        if (metricType === MetricType.ENGINE_TEMP) val = 82 + (i % 4) * 1.5;

        series.push({
          timestamp: new Date(now - i * (3600000 / (points / 6))).toISOString(),
          value: Number(val.toFixed(2)),
        });
      }

      return { yachtId, metricType, range, series };
    }

    const since = this.getSinceDate(range);
    const records = await this.prisma.telemetryRecord.findMany({
      where: { yachtId, metricType, timestamp: { gte: since } },
      orderBy: { timestamp: 'asc' },
      take: 200,
    });

    return {
      yachtId,
      metricType,
      range,
      series: records.map((r) => ({
        timestamp: r.timestamp.toISOString(),
        value: r.value,
      })),
    };
  }

  private getSinceDate(range: string): Date {
    const now = new Date();
    if (range === '1h') return new Date(now.getTime() - 60 * 60 * 1000);
    if (range === '6h') return new Date(now.getTime() - 6 * 60 * 60 * 1000);
    if (range === '7d') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    if (range === '30d') return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24h default
  }
}
