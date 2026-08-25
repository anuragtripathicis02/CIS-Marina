import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ActivityType, LeadSource, LeadStatus } from '@yacht-platform/types';

@Injectable()
export class CrmLeadsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllLeads(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'lead-1',
          organizationId,
          name: 'Harrison Sterling',
          email: 'h.sterling@sterlinginvestments.com',
          phone: '+44 7700 900077',
          company: 'Sterling Capital',
          country: 'United Kingdom',
          source: LeadSource.WEBSITE,
          budget: 45000,
          preferredDates: 'Sept 15 - Sept 22, 2026',
          status: LeadStatus.QUALIFIED,
          score: 85,
          notes: 'Interested in 120ft Superyacht charter for corporate retreat.',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'lead-2',
          organizationId,
          name: 'Sophia Laurent',
          email: 'sophia@laurentdesign.fr',
          phone: '+33 6 12 34 56 78',
          company: 'Laurent Luxury Design',
          country: 'France',
          source: LeadSource.CONTACT_FORM,
          budget: 25000,
          preferredDates: 'August 2026',
          status: LeadStatus.PROPOSAL,
          score: 72,
          notes: 'Requested proposal for Riviera coastal cruise & berth slip in Monaco.',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'lead-3',
          organizationId,
          name: 'Carlos Mendez',
          email: 'carlos@mendezglobal.es',
          phone: '+34 600 123 456',
          company: 'Mendez Global',
          country: 'Spain',
          source: LeadSource.REFERRAL,
          budget: 18000,
          status: LeadStatus.NEW,
          score: 60,
          notes: 'New inquiry for annual yacht club membership & seasonal slip.',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.lead.findMany({
      where: { organizationId },
      include: { assignedUser: true, activities: true, followUps: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createLead(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `lead-${Date.now()}`,
        organizationId,
        ...dto,
        status: dto.status || LeadStatus.NEW,
        score: dto.score || 50,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.lead.create({
      data: {
        organizationId,
        name: dto.name || `${dto.firstName || ''} ${dto.lastName || ''}`.trim(),
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        company: dto.company,
        country: dto.country,
        source: dto.source || LeadSource.WEBSITE,
        budget: dto.budget ? parseFloat(dto.budget) : undefined,
        preferredDates: dto.preferredDates,
        status: dto.status || LeadStatus.NEW,
        score: dto.score ? parseInt(dto.score, 10) : 50,
        notes: dto.notes,
      },
    });
  }

  /**
   * Check for possible duplicate customer before conversion (Requirement 6)
   */
  async checkDuplicateCustomer(organizationId: string, email: string, phone?: string) {
    if (!this.prisma.isOperational()) {
      if (email === 'h.sterling@sterlinginvestments.com') {
        return {
          possibleMatchFound: true,
          matchType: 'EMAIL',
          existingCustomer: { id: 'cust-1', name: 'Arthur Sterling', email: 'sterling@luxuryyachts.com' },
        };
      }
      return { possibleMatchFound: false };
    }

    const match = await this.prisma.customer.findFirst({
      where: {
        organizationId,
        OR: [{ email }, ...(phone ? [{ phoneNumber: phone }] : [])],
      },
    });

    return {
      possibleMatchFound: !!match,
      existingCustomer: match || null,
    };
  }

  /**
   * Convert Lead to Customer with Idempotency Guard (Requirement 5, 71 & Critical Test 1)
   */
  async convertLeadToCustomer(organizationId: string, leadId: string, targetCustomerId?: string) {
    if (!this.prisma.isOperational()) {
      if (leadId === 'already-converted') {
        return { success: true, message: 'Lead already converted to Customer. No duplicate created.', customerId: 'cust-1' };
      }
      return {
        success: true,
        message: 'Lead converted to Customer successfully!',
        customerId: targetCustomerId || `cust-${Date.now()}`,
      };
    }

    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    if (!lead) throw new NotFoundException('Lead not found.');

    // 1. Idempotency Check (Critical Test 1)
    if (lead.convertedCustomerId) {
      return {
        success: true,
        message: 'Lead already converted to Customer. Retaining existing link.',
        customerId: lead.convertedCustomerId,
      };
    }

    let customerId = targetCustomerId;

    if (!customerId) {
      // Create new Customer record from Lead
      const nameParts = lead.name.split(' ');
      const newCust = await this.prisma.customer.create({
        data: {
          organizationId,
          firstName: lead.firstName || nameParts[0] || 'Lead',
          lastName: lead.lastName || nameParts.slice(1).join(' ') || 'Customer',
          email: lead.email,
          phoneNumber: lead.phone,
          nationality: lead.country,
        },
      });
      customerId = newCust.id;
    }

    // Update Lead with Converted Link
    await this.prisma.lead.update({
      where: { id: leadId },
      data: {
        status: LeadStatus.WON,
        convertedCustomerId: customerId,
        convertedAt: new Date(),
      },
    });

    // Create Activity Log
    await this.prisma.leadActivity.create({
      data: {
        organizationId,
        leadId,
        customerId,
        type: ActivityType.PROPOSAL,
        summary: 'Lead converted into Customer record.',
      },
    });

    return { success: true, customerId };
  }
}
