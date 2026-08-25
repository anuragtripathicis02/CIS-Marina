import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PrivacyRequestStatus, PrivacyRequestType } from '@yacht-platform/types';

@Injectable()
export class ComplianceService {
  constructor(private readonly prisma: PrismaService) {}

  async searchAuditLogs(organizationId: string, query?: string) {
    return [
      {
        id: 'aud-901',
        organizationId,
        user: 'Lord Sterling (Customer)',
        action: 'BOOKING_CONFIRMED',
        resource: 'Booking',
        resourceId: 'bk-1024',
        ipAddress: '194.28.12.98',
        result: 'SUCCESS',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'aud-902',
        organizationId,
        user: 'Jean-Luc Vance (Org Admin)',
        action: 'TAX_RULE_UPDATED',
        resource: 'TaxRule',
        resourceId: 'tr-vat-20',
        ipAddress: '185.12.44.10',
        result: 'SUCCESS',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'aud-903',
        organizationId,
        user: 'Security Guard System',
        action: 'UNAUTHORIZED_CROSS_TENANT_ATTEMPT',
        resource: 'CustomerBooking',
        resourceId: 'bk-other-customer',
        ipAddress: '203.0.113.45',
        result: 'DENIED_HTTP_403',
        timestamp: new Date(Date.now() - 14400000).toISOString(),
      },
    ];
  }

  async getConsentHistory(customerId: string) {
    return [
      {
        id: 'con-1',
        customerId,
        consentType: 'TERMS_AND_CONDITIONS',
        policyVersion: 'v2.1',
        isGranted: true,
        channel: 'PORTAL',
        source: 'CHECKOUT_OPT_IN',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'con-2',
        customerId,
        consentType: 'MARKETING_WHATSAPP',
        policyVersion: 'v1.0',
        isGranted: true,
        channel: 'PORTAL',
        source: 'PROFILE_SETTINGS',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
    ];
  }

  async findPrivacyRequests(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'pr-101',
          organizationId,
          customerId: 'cust-1',
          requestType: PrivacyRequestType.EXPORT,
          status: PrivacyRequestStatus.COMPLETED,
          requestedAt: new Date(Date.now() - 172800000).toISOString(),
          completedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
    }

    return this.prisma.privacyRequest.findMany({
      where: { organizationId },
      orderBy: { requestedAt: 'desc' },
    });
  }
}
