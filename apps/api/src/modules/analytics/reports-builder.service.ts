import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ExecutiveAlertCategory, ExecutiveAlertSeverity, ISavedReport } from '@yacht-platform/types';

@Injectable()
export class ReportsBuilderService {
  constructor(private readonly prisma: PrismaService) {}

  async getExecutiveAlerts(organizationId: string) {
    return [
      {
        id: 'alt-801',
        organizationId,
        category: ExecutiveAlertCategory.MAINTENANCE,
        severity: ExecutiveAlertSeverity.HIGH,
        title: 'Elevated Port Engine Temperature Risk — Azure Horizon 88',
        message: 'Port engine operating temperature trended +8.2°C above baseline during recent 4-hour charter.',
        recommendedAction: 'Schedule port engine coolant loop inspection prior to Sept 12 charter.',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'alt-802',
        organizationId,
        category: ExecutiveAlertCategory.FLEET,
        severity: ExecutiveAlertSeverity.WARNING,
        title: 'Vessel Underutilization Detected — Serenity Sunreef 70',
        message: 'Serenity Sunreef 70 utilization dropped to 52% (target: 75%). 12 idle days in Sept.',
        recommendedAction: 'Review daily charter rate or feature in Autumn Luxury Catamaran Promotion.',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  async getSavedReports(organizationId: string): Promise<ISavedReport[]> {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'rep-1',
          organizationId,
          name: 'Monthly Executive Yacht Revenue & Utilization',
          metricKeys: ['REVENUE', 'UTILIZATION', 'DOWNTIME'],
          dimensions: ['YACHT_NAME', 'MONTH'],
          scheduleCron: '0 8 1 * *',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'rep-2',
          organizationId,
          name: 'Marina Slip Occupancy & RevPAR Statement',
          metricKeys: ['SLIP_OCCUPANCY', 'REVPAR', 'UTILITY_REVENUE'],
          dimensions: ['MARINA_NAME', 'WEEK'],
          scheduleCron: '0 8 * * 1',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    const reports = await this.prisma.savedReport.findMany({
      where: { organizationId },
    });

    return reports as unknown as ISavedReport[];
  }

  async generateCsvExport(organizationId: string, reportName: string) {
    const csvHeader = 'Period,YachtName,Category,RevenueEUR,UtilizationPercent,MaintenanceRisk\n';
    const csvRows =
      '2026-08,Ocean Pearl 115,Superyacht,245000,84.5,LOW\n' +
      '2026-08,Azure Horizon 88,Motor Yacht,168000,76.0,HIGH\n' +
      '2026-08,Serenity Sunreef 70,Catamaran,98000,52.0,MEDIUM\n';

    return {
      filename: `${reportName.toLowerCase().replace(/\s+/g, '_')}_export.csv`,
      contentType: 'text/csv',
      content: csvHeader + csvRows,
    };
  }
}
