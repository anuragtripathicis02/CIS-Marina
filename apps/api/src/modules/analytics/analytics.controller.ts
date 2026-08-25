import { Controller, Get, Post, Body, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { KpiService } from './kpi.service';
import { RevenueForecastService } from './revenue-forecast.service';
import { FleetPredictiveService } from './fleet-predictive.service';
import { MarinaAnalyticsService } from './marina-analytics.service';
import { CustomerIntelligenceService } from './customer-intelligence.service';
import { AiAnalyticsService } from './ai-analytics.service';
import { ReportsBuilderService } from './reports-builder.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('analytics')
@UseGuards(TenantGuard)
export class AnalyticsController {
  constructor(
    private readonly kpiService: KpiService,
    private readonly forecastService: RevenueForecastService,
    private readonly fleetService: FleetPredictiveService,
    private readonly marinaService: MarinaAnalyticsService,
    private readonly customerService: CustomerIntelligenceService,
    private readonly aiAnalyticsService: AiAnalyticsService,
    private readonly reportsService: ReportsBuilderService,
  ) {}

  @Get('summary')
  async getSummary(@CurrentTenant() organizationId: string) {
    const data = await this.kpiService.getExecutiveSummary(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('kpis')
  async getKpis(@CurrentTenant() organizationId: string) {
    const data = await this.kpiService.getKpis(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('forecast')
  async getForecast(@CurrentTenant() organizationId: string) {
    const data = await this.forecastService.getRevenueForecast(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('demand-heatmap')
  async getDemandHeatmap(@CurrentTenant() organizationId: string) {
    const data = await this.forecastService.getDemandHeatmap(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('fleet-scores')
  async getFleetScores(@CurrentTenant() organizationId: string) {
    const data = await this.fleetService.getYachtPerformanceScores(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('maintenance-risks')
  async getMaintenanceRisks(@CurrentTenant() organizationId: string) {
    const data = await this.fleetService.getPredictiveMaintenanceRisks(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('marina-metrics')
  async getMarinaMetrics(@CurrentTenant() organizationId: string) {
    const data = await this.marinaService.getMarinaMetrics(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('customer-segments')
  async getCustomerSegments(@CurrentTenant() organizationId: string) {
    const data = await this.customerService.getCustomerSegments(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('retention-alerts')
  async getRetentionAlerts(@CurrentTenant() organizationId: string) {
    const data = await this.customerService.getRetentionRiskAlerts(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('ai-query')
  async aiQuery(@CurrentTenant() organizationId: string, @Body() dto: { query: string }) {
    const data = await this.aiAnalyticsService.processExecutiveQuery(organizationId || 'org-1', dto.query);
    return { success: true, data };
  }

  @Get('alerts')
  async getExecutiveAlerts(@CurrentTenant() organizationId: string) {
    const data = await this.reportsService.getExecutiveAlerts(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('saved-reports')
  async getSavedReports(@CurrentTenant() organizationId: string) {
    const data = await this.reportsService.getSavedReports(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('export/csv')
  async exportCsv(@CurrentTenant() organizationId: string, @Query('reportName') reportName: string, @Res() res: Response) {
    const exportData = await this.reportsService.generateCsvExport(organizationId || 'org-1', reportName || 'executive_summary');
    res.setHeader('Content-Type', exportData.contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${exportData.filename}`);
    return res.send(exportData.content);
  }
}
