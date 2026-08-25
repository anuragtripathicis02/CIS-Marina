import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { IExecutiveSummary, IKpiDefinition } from '@yacht-platform/types';

@Injectable()
export class KpiService {
  constructor(private readonly prisma: PrismaService) {}

  async getExecutiveSummary(organizationId: string): Promise<IExecutiveSummary> {
    return {
      totalRevenue: 542000,
      revenueGrowthPercent: 14.8,
      totalBookings: 84,
      avgBookingValue: 6450,
      fleetUtilizationPercent: 78.4,
      marinaOccupancyPercent: 86.2,
      customerGrowthPercent: 12.5,
      activeMaintenanceRisksCount: 2,
      aiExecutiveNarrative:
        'Q3 Executive Summary: Net revenue increased by +14.8% YoY driven by high superyacht demand in Riviera ports. Marina slip occupancy reached 86.2%. Two vessels show elevated maintenance risk scores based on telemetry operating hours and recommend inspection before next charter.',
    };
  }

  async getKpis(organizationId: string): Promise<IKpiDefinition[]> {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'kpi-1',
          organizationId,
          kpiKey: 'TOTAL_REVENUE',
          name: 'Total Monthly Net Revenue',
          currentValue: 542000,
          targetValue: 500000,
          warningThreshold: 450000,
          criticalThreshold: 400000,
          unit: 'EUR',
          timePeriod: 'MONTHLY',
        },
        {
          id: 'kpi-2',
          organizationId,
          kpiKey: 'FLEET_UTILIZATION',
          name: 'Fleet Operational Utilization',
          currentValue: 78.4,
          targetValue: 75.0,
          warningThreshold: 65.0,
          criticalThreshold: 55.0,
          unit: '%',
          timePeriod: 'MONTHLY',
        },
        {
          id: 'kpi-3',
          organizationId,
          kpiKey: 'MARINA_OCCUPANCY',
          name: 'Marina Slip Occupancy Rate',
          currentValue: 86.2,
          targetValue: 80.0,
          warningThreshold: 70.0,
          criticalThreshold: 60.0,
          unit: '%',
          timePeriod: 'MONTHLY',
        },
      ];
    }

    return this.prisma.kpiDefinition.findMany({
      where: { organizationId },
    });
  }
}
