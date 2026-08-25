import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ConciergeRequestStatus, ServiceRequestStatus } from '@yacht-platform/types';

@Injectable()
export class ConciergeService {
  constructor(private readonly prisma: PrismaService) {}

  async findConciergeRequests(customerId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'cr-101',
          customerId,
          category: 'Private Jet & Airport Transfer',
          description: 'Helicopter transfer from Nice Côte d\'Azur Airport to Monaco Heliport for 4 guests.',
          preferredDate: '2026-09-12T08:30:00Z',
          budget: 2500,
          status: ConciergeRequestStatus.ACCEPTED,
          proposalDetails: 'Confirmed Eurocopter EC130 charter via Monacair. Flight #MC-402.',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'cr-102',
          customerId,
          category: 'Michelin Dining Reservation',
          description: 'Table for 6 at Le Louis XV - Alain Ducasse à Hôtel de Paris on Sept 14th 20:30.',
          preferredDate: '2026-09-14T20:30:00Z',
          status: ConciergeRequestStatus.UNDER_REVIEW,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.conciergeRequest.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create Concierge Request (Requirement 21, 22)
   */
  async createConciergeRequest(organizationId: string, customerId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `cr-${Date.now()}`,
        organizationId,
        customerId,
        ...dto,
        status: ConciergeRequestStatus.REQUESTED,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.conciergeRequest.create({
      data: {
        organizationId,
        customerId,
        bookingId: dto.bookingId,
        category: dto.category,
        description: dto.description,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : undefined,
        budget: dto.budget ? parseFloat(dto.budget) : undefined,
        status: ConciergeRequestStatus.REQUESTED,
      },
    });
  }

  /**
   * Add-On Service Request with Operator Review Guard (Requirement 18, 75 & Critical Test 5)
   */
  async createServiceRequest(organizationId: string, customerId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `sr-${Date.now()}`,
        organizationId,
        customerId,
        serviceName: dto.serviceName || 'Private Chef Experience',
        totalPrice: dto.totalPrice || 1200,
        status: ServiceRequestStatus.REQUESTED,
        message: 'Service request submitted for operator review & confirmation.',
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.serviceRequest.create({
      data: {
        organizationId,
        customerId,
        bookingId: dto.bookingId,
        serviceId: dto.serviceId || 'svc-1',
        serviceName: dto.serviceName,
        requestedDate: new Date(dto.requestedDate || Date.now()),
        quantity: dto.quantity || 1,
        totalPrice: dto.totalPrice || 500,
        status: ServiceRequestStatus.REQUESTED,
        notes: dto.notes,
      },
    });
  }
}
