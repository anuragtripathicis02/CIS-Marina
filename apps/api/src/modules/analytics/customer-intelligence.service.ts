import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CustomerSegment, ICustomerIntelligenceSegment } from '@yacht-platform/types';

@Injectable()
export class CustomerIntelligenceService {
  constructor(private readonly prisma: PrismaService) {}

  async getCustomerSegments(organizationId: string): Promise<ICustomerIntelligenceSegment[]> {
    return [
      { segment: CustomerSegment.VIP, count: 14, totalRevenue: 380000, averageClvEstimate: 125000, churnRiskCount: 0 },
      { segment: CustomerSegment.HIGH_VALUE, count: 28, totalRevenue: 240000, averageClvEstimate: 65000, churnRiskCount: 1 },
      { segment: CustomerSegment.REPEAT, count: 45, totalRevenue: 180000, averageClvEstimate: 35000, churnRiskCount: 3 },
      { segment: CustomerSegment.AT_RISK, count: 8, totalRevenue: 45000, averageClvEstimate: 22000, churnRiskCount: 8 },
      { segment: CustomerSegment.NEW, count: 32, totalRevenue: 95000, averageClvEstimate: 18000, churnRiskCount: 0 },
    ];
  }

  async getRetentionRiskAlerts(organizationId: string) {
    return [
      {
        customerId: 'c-108',
        customerName: 'Baroness Helena Vance',
        segment: CustomerSegment.AT_RISK,
        lastBookingDate: '2025-08-14T10:00:00Z',
        inactivityDays: 376,
        reason: 'Long inactivity (>365 days) after 3 previous high-value charters',
        recommendedAction: 'Send VIP Anniversary Charter Invitation with complimentary chef upgrade',
      },
    ];
  }
}
