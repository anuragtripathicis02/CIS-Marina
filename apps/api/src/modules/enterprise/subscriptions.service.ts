import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SubscriptionPlan, SubscriptionStatus } from '@yacht-platform/types';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSubscription(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return {
        id: 'sub-business-101',
        organizationId,
        planName: SubscriptionPlan.BUSINESS,
        status: SubscriptionStatus.ACTIVE,
        userLimit: 25,
        yachtLimit: 15,
        bookingLimit: 1000,
        aiRequestLimit: 5000,
        storageLimitMb: 100000,
        currentStorageUsedMb: 14200,
        renewsAt: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString(),
      };
    }

    return this.prisma.subscription.findUnique({ where: { organizationId } });
  }

  async getFeatureFlags(organizationId: string) {
    return [
      { key: 'AI_ENABLED', isEnabled: true, description: 'AI Revenue Pricing & Concierge Assistant' },
      { key: 'MARINA_ENABLED', isEnabled: true, description: 'Marina Berths & Slip Contracts' },
      { key: 'YACHT_CLUB_ENABLED', isEnabled: true, description: 'Yacht Club Memberships & Regattas' },
      { key: 'CRM_ENABLED', isEnabled: true, description: 'CRM Pipeline & Lead Converter' },
      { key: 'CONCIERGE_ENABLED', isEnabled: true, description: 'Bespoke Concierge & Helicopter Desk' },
      { key: 'IOT_ENABLED', isEnabled: true, description: 'Real-Time IoT Telemetry & Geofencing' },
    ];
  }
}
