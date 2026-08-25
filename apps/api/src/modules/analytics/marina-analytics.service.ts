import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class MarinaAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getMarinaMetrics(organizationId: string) {
    return {
      marinaName: 'Monaco Port Hercules',
      totalBerths: 120,
      occupiedBerths: 103,
      berthOccupancyPercent: 85.8,
      revParBerth: 480,
      peakArrivalHours: '14:00 - 17:00',
      peakDepartureHours: '09:00 - 11:00',
      topServices: [
        { name: 'VIP Dockside Shore Power (63A)', usageCount: 88, revenue: 14200 },
        { name: 'Fresh Water Bunkering', usageCount: 95, revenue: 8400 },
        { name: 'Blackwater Sewage Pump-Out', usageCount: 62, revenue: 3100 },
      ],
    };
  }
}
