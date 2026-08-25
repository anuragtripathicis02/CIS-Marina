import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ActivityType, FollowUpStatus, TaskPriority } from '@yacht-platform/types';

@Injectable()
export class CrmActivitiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllActivities(organizationId: string, leadId?: string, customerId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'act-1',
          organizationId,
          leadId: leadId || 'lead-1',
          type: ActivityType.CALL,
          summary: 'Inbound Phone Call — Charter Inquiries',
          notes: 'Client inquired about 120ft vessel availability for September.',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
        {
          id: 'act-2',
          organizationId,
          leadId: leadId || 'lead-1',
          type: ActivityType.EMAIL,
          summary: 'Sent Quote Proposal #Q-1042',
          notes: 'Detailed pricing proposal with itinerary sent via email.',
          createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
        },
      ];
    }

    return this.prisma.leadActivity.findMany({
      where: {
        organizationId,
        ...(leadId ? { leadId } : {}),
        ...(customerId ? { customerId } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findFollowUps(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'fu-1',
          organizationId,
          leadId: 'lead-1',
          dueDate: new Date(Date.now() + 3600000 * 24).toISOString(),
          priority: TaskPriority.HIGH,
          notes: 'Follow up on Quote Proposal #Q-1042 response.',
          status: FollowUpStatus.PENDING,
          lead: { name: 'Harrison Sterling', email: 'h.sterling@sterlinginvestments.com' },
          createdAt: new Date().toISOString(),
        },
        {
          id: 'fu-2',
          organizationId,
          leadId: 'lead-2',
          dueDate: new Date(Date.now() - 3600000 * 48).toISOString(),
          priority: TaskPriority.MEDIUM,
          notes: 'Send Riviera marina berth slip availability specs.',
          status: FollowUpStatus.OVERDUE,
          lead: { name: 'Sophia Laurent', email: 'sophia@laurentdesign.fr' },
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.followUpTask.findMany({
      where: { organizationId },
      include: { lead: true, customer: true, assignedUser: true },
      orderBy: { dueDate: 'asc' },
    });
  }

  async createFollowUp(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `fu-${Date.now()}`,
        organizationId,
        ...dto,
        status: FollowUpStatus.PENDING,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.followUpTask.create({
      data: {
        organizationId,
        leadId: dto.leadId,
        customerId: dto.customerId,
        assignedUserId: dto.assignedUserId,
        dueDate: new Date(dto.dueDate),
        priority: dto.priority || TaskPriority.MEDIUM,
        notes: dto.notes,
        status: FollowUpStatus.PENDING,
      },
    });
  }
}
