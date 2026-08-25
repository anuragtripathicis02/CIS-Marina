import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { TelemetryIngestionService } from './telemetry-ingestion.service';
import { TelemetryHistoryService } from './telemetry-history.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { MetricType } from '@yacht-platform/types';

@Controller('telemetry')
export class TelemetryController {
  constructor(
    private readonly ingestionService: TelemetryIngestionService,
    private readonly historyService: TelemetryHistoryService,
  ) {}

  @Post('ingest')
  async ingestTelemetry(@Body() payload: any) {
    const data = await this.ingestionService.ingestTelemetry(payload);
    return { success: true, data };
  }

  @Get('history')
  @UseGuards(TenantGuard)
  async getTrackHistory(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId: string,
    @Query('range') range?: string,
  ) {
    const data = await this.historyService.getTrackHistory(organizationId || 'org-1', yachtId || 'y1', range);
    return { success: true, data };
  }

  @Get('series')
  @UseGuards(TenantGuard)
  async getMetricSeries(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId: string,
    @Query('metricType') metricType: MetricType,
    @Query('range') range?: string,
  ) {
    const data = await this.historyService.getMetricSeries(organizationId || 'org-1', yachtId || 'y1', metricType, range);
    return { success: true, data };
  }
}
