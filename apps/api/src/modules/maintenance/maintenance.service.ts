import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { MaintenancePriority, MaintenanceStatus, YachtOperationalStatus } from '@yacht-platform/types';

@Injectable()
export class MaintenanceService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'm1',
          organizationId,
          yachtId: 'y1',
          yacht: { name: 'Ocean Pearl 115' },
          title: 'Starboard Main Engine Injector Calibration',
          description: 'Scheduled 500-hour MTU diesel engine service and high-pressure fuel injector check.',
          priority: MaintenancePriority.HIGH,
          status: MaintenanceStatus.IN_PROGRESS,
          isBlocking: true,
          assignedVendorName: 'Monaco Marine Yard & Services',
          dueDate: '2026-08-30T00:00:00.000Z',
          estimatedCost: 4500.0,
          actualCost: 4200.0,
          currency: 'EUR',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'm2',
          organizationId,
          yachtId: 'y2',
          yacht: { name: 'Azure Horizon 88' },
          title: 'Flybridge Teak Decking Reseal',
          description: 'Sanding and marine teak sealant coat after charter season.',
          priority: MaintenancePriority.LOW,
          status: MaintenanceStatus.PLANNED,
          isBlocking: false,
          assignedVendorName: 'Riviera Boat Care',
          dueDate: '2026-09-15T00:00:00.000Z',
          estimatedCost: 1800.0,
          currency: 'EUR',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.maintenanceRecord.findMany({
      where: { organizationId },
      include: {
        yacht: true,
        vendor: true,
        inspection: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(organizationId: string, id: string) {
    if (!this.prisma.isOperational()) {
      const all = await this.findAll(organizationId);
      const found = all.find((m) => m.id === id);
      if (!found) throw new NotFoundException(`Maintenance record #${id} not found`);
      return found;
    }

    const record = await this.prisma.maintenanceRecord.findFirst({
      where: { id, organizationId },
      include: { yacht: true, vendor: true, inspection: true },
    });
    if (!record) throw new NotFoundException(`Maintenance record #${id} not found`);
    return record;
  }

  async create(organizationId: string, dto: any) {
    const isBlocking = dto.isBlocking ?? (dto.priority === MaintenancePriority.CRITICAL || dto.priority === MaintenancePriority.HIGH);

    if (!this.prisma.isOperational()) {
      return {
        id: `m-${Date.now()}`,
        organizationId,
        ...dto,
        isBlocking,
        status: dto.status || MaintenanceStatus.REPORTED,
        createdAt: new Date().toISOString(),
      };
    }

    const record = await this.prisma.maintenanceRecord.create({
      data: {
        organizationId,
        yachtId: dto.yachtId,
        vendorId: dto.vendorId,
        inspectionId: dto.inspectionId,
        title: dto.title,
        description: dto.description || dto.title,
        priority: dto.priority || MaintenancePriority.MEDIUM,
        status: dto.status || MaintenanceStatus.REPORTED,
        isBlocking,
        assignedVendorName: dto.assignedVendorName,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        estimatedCost: dto.estimatedCost ? parseFloat(dto.estimatedCost) : null,
        actualCost: dto.actualCost ? parseFloat(dto.actualCost) : null,
        notes: dto.notes,
      },
      include: { yacht: true },
    });

    // If blocking maintenance, create availability block in Phase 1 YachtAvailability engine
    if (isBlocking) {
      const startTime = new Date();
      const endTime = dto.dueDate ? new Date(dto.dueDate) : new Date(Date.now() + 7 * 86400000);

      await this.prisma.yachtAvailability.create({
        data: {
          yachtId: dto.yachtId,
          startTime,
          endTime,
          isBlocked: true,
          reason: `BLOCKING MAINTENANCE: ${dto.title}`,
        },
      });

      await this.prisma.yacht.update({
        where: { id: dto.yachtId },
        data: { operationalStatus: YachtOperationalStatus.MAINTENANCE },
      });
    }

    return record;
  }

  async updateStatus(organizationId: string, id: string, status: MaintenanceStatus) {
    if (!this.prisma.isOperational()) {
      return { id, status, updatedAt: new Date().toISOString() };
    }

    const record = await this.prisma.maintenanceRecord.findFirst({
      where: { id, organizationId },
    });
    if (!record) throw new NotFoundException(`Maintenance record #${id} not found`);

    const updated = await this.prisma.maintenanceRecord.update({
      where: { id },
      data: {
        status,
        completedDate: status === MaintenanceStatus.COMPLETED ? new Date() : record.completedDate,
      },
    });

    // If completed, check if yacht has any other active blocking maintenance
    if (status === MaintenanceStatus.COMPLETED) {
      const activeBlocking = await this.prisma.maintenanceRecord.count({
        where: {
          yachtId: record.yachtId,
          isBlocking: true,
          status: { in: [MaintenanceStatus.REPORTED, MaintenanceStatus.PLANNED, MaintenanceStatus.SCHEDULED, MaintenanceStatus.IN_PROGRESS, MaintenanceStatus.WAITING_PARTS] },
        },
      });

      if (activeBlocking === 0) {
        await this.prisma.yacht.update({
          where: { id: record.yachtId },
          data: { operationalStatus: YachtOperationalStatus.AVAILABLE },
        });
      }
    }

    return updated;
  }
}
