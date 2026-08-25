import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ChecklistItemResult, ChecklistStatus } from '@yacht-platform/types';

@Injectable()
export class ChecklistsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllTemplates(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'tmpl-1',
          organizationId,
          name: 'Luxury Superyacht Pre-Charter Checklist',
          description: 'Standard 10-point departure safety, cleanliness, and guest preparation checklist.',
          type: 'PRE_CHARTER',
          isActive: true,
          items: [
            { id: 'i1', title: 'Exterior Hull & Deck Cleanliness Inspection', isRequired: true, displayOrder: 1 },
            { id: 'i2', title: 'Interior Salon & Guest Staterooms Prepared', isRequired: true, displayOrder: 2 },
            { id: 'i3', title: 'SOLAS Safety Lifejackets & Rafts Inspected', isRequired: true, displayOrder: 3 },
            { id: 'i4', title: 'Fuel Bunkers Checked (>85% Capacity)', isRequired: true, displayOrder: 4 },
            { id: 'i5', title: 'Fresh Water Tank Filled (100% Capacity)', isRequired: true, displayOrder: 5 },
            { id: 'i6', title: 'VIP Catering & Wine Inventory Loaded', isRequired: false, displayOrder: 6 },
            { id: 'i7', title: 'Navigation Electronics & Radar Calibrated', isRequired: true, displayOrder: 7 },
          ],
        },
      ];
    }

    return this.prisma.checklistTemplate.findMany({
      where: { organizationId, isActive: true },
      include: { items: { orderBy: { displayOrder: 'asc' } } },
    });
  }

  async findInstances(organizationId: string, yachtId?: string, bookingId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'chk-1',
          organizationId,
          yachtId: yachtId || 'y1',
          bookingId: bookingId || 'b1',
          templateId: 'tmpl-1',
          status: ChecklistStatus.COMPLETED,
          completedAt: new Date().toISOString(),
          items: [
            { id: 'ci1', title: 'Exterior Hull & Deck Cleanliness Inspection', result: ChecklistItemResult.COMPLETED },
            { id: 'ci2', title: 'SOLAS Safety Lifejackets & Rafts Inspected', result: ChecklistItemResult.COMPLETED },
          ],
        },
      ];
    }

    return this.prisma.checklistInstance.findMany({
      where: {
        organizationId,
        ...(yachtId ? { yachtId } : {}),
        ...(bookingId ? { bookingId } : {}),
      },
      include: {
        template: true,
        items: true,
        yacht: true,
        booking: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createInstance(organizationId: string, dto: {
    yachtId: string;
    bookingId?: string;
    templateId: string;
  }) {
    if (!this.prisma.isOperational()) {
      return {
        id: `chk-${Date.now()}`,
        organizationId,
        ...dto,
        status: ChecklistStatus.PENDING,
        createdAt: new Date().toISOString(),
        items: [],
      };
    }

    const template = await this.prisma.checklistTemplate.findFirst({
      where: { id: dto.templateId, organizationId },
      include: { items: true },
    });
    if (!template) throw new NotFoundException(`Checklist template #${dto.templateId} not found`);

    const instance = await this.prisma.checklistInstance.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        bookingId: dto.bookingId,
        templateId: dto.templateId,
        status: ChecklistStatus.PENDING,
        items: {
          create: template.items.map((item) => ({
            title: item.title,
            result: ChecklistItemResult.PENDING,
          })),
        },
      },
      include: { items: true, template: true },
    });

    return instance;
  }

  async updateItemResult(organizationId: string, instanceItemId: string, result: ChecklistItemResult, notes?: string) {
    if (!this.prisma.isOperational()) {
      return { id: instanceItemId, result, notes, completedAt: new Date().toISOString() };
    }

    const updatedItem = await this.prisma.checklistInstanceItem.update({
      where: { id: instanceItemId },
      data: {
        result,
        notes,
        completedAt: new Date(),
      },
      include: { instance: { include: { items: true } } },
    });

    // Evaluate instance progress
    const allItems = updatedItem.instance.items;
    const allCompleted = allItems.every((i) => i.result === ChecklistItemResult.COMPLETED || i.result === ChecklistItemResult.NOT_APPLICABLE);
    const anyFailed = allItems.some((i) => i.result === ChecklistItemResult.FAILED);

    const newStatus = anyFailed
      ? ChecklistStatus.FAILED
      : allCompleted
      ? ChecklistStatus.COMPLETED
      : ChecklistStatus.IN_PROGRESS;

    await this.prisma.checklistInstance.update({
      where: { id: updatedItem.instanceId },
      data: {
        status: newStatus,
        completedAt: newStatus === ChecklistStatus.COMPLETED ? new Date() : null,
      },
    });

    return updatedItem;
  }
}
