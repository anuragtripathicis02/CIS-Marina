import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { BookingStatus } from '@yacht-platform/types';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getMetrics(organizationId?: string) {
    const whereOrg = organizationId ? { organizationId } : {};

    const [totalBookings, confirmedBookings, pendingBookings, activeYachts, totalCustomers, payments] =
      await Promise.all([
        this.prisma.booking.count({ where: whereOrg }),
        this.prisma.booking.count({ where: { ...whereOrg, status: BookingStatus.CONFIRMED } }),
        this.prisma.booking.count({ where: { ...whereOrg, status: BookingStatus.PENDING } }),
        this.prisma.yacht.count({ where: { ...whereOrg, isActive: true } }),
        this.prisma.customer.count({ where: whereOrg }),
        this.prisma.payment.findMany({ where: whereOrg }),
      ]);

    const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount), 0);

    const recentBookings = await this.prisma.booking.findMany({
      where: whereOrg,
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { yacht: true, customer: true },
    });

    return {
      totalBookings,
      upcomingCharters: confirmedBookings,
      confirmedBookings,
      pendingBookings,
      availableYachts: activeYachts,
      totalCustomers,
      revenue: totalRevenue,
      currency: 'USD',
      recentBookings,
    };
  }
}
