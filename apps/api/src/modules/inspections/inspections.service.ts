import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { InspectionItemResult, InspectionStatus, InspectionType, MaintenancePriority, MaintenanceStatus } from '@yacht-platform/types';

@Injectable()
export class InspectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string, yachtId?: string, bookingId?: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'insp-1',
          organizationId,
          yachtId: yachtId || 'y1',
          bookingId: bookingId || 'b1',
          type: InspectionType.PRE_CHARTER,
          status: InspectionStatus.PASSED,
          inspectionDate: '2026-08-20T10:00:00.000Z',
          items: [
            { id: 'ii1', categoryName: 'Engine & Propulsion', itemName: 'Main Engine Oil & Coolant Levels', result: InspectionItemResult.PASS },
            { id: 'ii2', categoryName: 'Safety Equipment', itemName: 'SOLAS Flares & EPIRB Beacon Test', result: InspectionItemResult.PASS },
            { id: 'ii3', categoryName: 'Hull & Deck', itemName: 'Anchor Windlass & Chain Stopper', result: InspectionItemResult.PASS },
          ],
        },
      ];
    }

    return this.prisma.inspection.findMany({
      where: {
        organizationId,
        ...(yachtId ? { yachtId } : {}),
        ...(bookingId ? { bookingId } : {}),
      },
      include: {
        yacht: true,
        booking: true,
        items: true,
        maintenanceRecords: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(organizationId: string, dto: {
    yachtId: string;
    bookingId?: string;
    type?: InspectionType;
    notes?: string;
    items?: { categoryName: string; itemName: string }[];
  }) {
    const defaultItems = dto.items || [
      { categoryName: 'Propulsion', itemName: 'Main Engine & Generator Fluids' },
      { categoryName: 'Safety', itemName: 'Life Rafts & EPIRB Expiry' },
      { categoryName: 'Electronics', itemName: 'VHF Radio & Radar Functionality' },
      { categoryName: 'Hull', itemName: 'Bilge Pumps & Float Switches' },
    ];

    if (!this.prisma.isOperational()) {
      return {
        id: `insp-${Date.now()}`,
        organizationId,
        ...dto,
        type: dto.type || InspectionType.PRE_CHARTER,
        status: InspectionStatus.PENDING,
        createdAt: new Date().toISOString(),
        items: defaultItems.map((i, idx) => ({ id: `item-${idx}`, ...i, result: InspectionItemResult.NOT_CHECKED })),
      };
    }

    return this.prisma.inspection.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        bookingId: dto.bookingId,
        type: dto.type || InspectionType.PRE_CHARTER,
        status: InspectionStatus.PENDING,
        notes: dto.notes,
        items: {
          create: defaultItems.map((i) => ({
            categoryName: i.categoryName,
            itemName: i.itemName,
            result: InspectionItemResult.NOT_CHECKED,
          })),
        },
      },
      include: { items: true },
    });
  }

  async evaluateItem(organizationId: string, itemId: string, dto: {
    result: InspectionItemResult;
    notes?: string;
    createMaintenanceIfFailed?: boolean;
  }) {
    if (!this.prisma.isOperational()) {
      return { id: itemId, ...dto, updatedAt: new Date().toISOString() };
    }

    const item = await this.prisma.inspectionItem.findUnique({
      where: { id: itemId },
      include: { inspection: true },
    });
    if (!item) throw new NotFoundException(`Inspection item #${itemId} not found`);

    const updatedItem = await this.prisma.inspectionItem.update({
      where: { id: itemId },
      data: {
        result: dto.result,
        notes: dto.notes,
      },
    });

    // Auto-create Maintenance Record if Item Failed (Requirement 33)
    if (dto.result === InspectionItemResult.FAIL && (dto.createMaintenanceIfFailed ?? true)) {
      await this.prisma.maintenanceRecord.create({
        data: {
          organizationId,
          yachtId: item.inspection.yachtId,
          inspectionId: item.inspection.id,
          title: `Inspection Failure: ${item.categoryName} - ${item.itemName}`,
          description: dto.notes || `Failed during ${item.inspection.type} inspection.`,
          priority: MaintenancePriority.HIGH,
          status: MaintenanceStatus.REPORTED,
          isBlocking: true,
        },
      });

      await this.prisma.inspectionItem.update({
        where: { id: itemId },
        data: { maintenanceCreated: true },
      });
    }

    // Check inspection total status
    const allItems = await this.prisma.inspectionItem.findMany({
      where: { inspectionId: item.inspectionId },
    });

    const anyFailed = allItems.some((i) => i.result === InspectionItemResult.FAIL);
    const allChecked = allItems.every((i) => i.result !== InspectionItemResult.NOT_CHECKED);

    let finalStatus = InspectionStatus.IN_PROGRESS;
    if (allChecked) {
      finalStatus = anyFailed ? InspectionStatus.FAILED : InspectionStatus.PASSED;
    }

    await this.prisma.inspection.update({
      where: { id: item.inspectionId },
      data: { status: finalStatus },
    });

    return updatedItem;
  }
}
