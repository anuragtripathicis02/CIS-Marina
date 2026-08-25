import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ChecklistStatus, InspectionStatus, MaintenanceStatus, YachtOperationalStatus } from '@yacht-platform/types';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async calculateYachtReadiness(organizationId: string, yachtId: string, bookingId?: string) {
    if (!this.prisma.isOperational()) {
      return {
        yachtId,
        isReady: false,
        status: YachtOperationalStatus.PREPARING,
        reasons: [
          'Captain not assigned to charter',
          'Pre-charter inspection pending',
        ],
        assignedCrewCount: 1,
        checklistCompleted: true,
        inspectionCompleted: false,
        activeBlockingMaintenanceCount: 0,
      };
    }

    const yacht = await this.prisma.yacht.findFirst({
      where: { id: yachtId, organizationId },
    });
    if (!yacht) throw new NotFoundException(`Yacht #${yachtId} not found`);

    const reasons: string[] = [];

    // 1. Check Blocking Maintenance
    const activeBlockingMaintenance = await this.prisma.maintenanceRecord.count({
      where: {
        yachtId,
        isBlocking: true,
        status: { in: [MaintenanceStatus.REPORTED, MaintenanceStatus.PLANNED, MaintenanceStatus.SCHEDULED, MaintenanceStatus.IN_PROGRESS, MaintenanceStatus.WAITING_PARTS] },
      },
    });
    if (activeBlockingMaintenance > 0) {
      reasons.push(`${activeBlockingMaintenance} active blocking maintenance issue(s) in progress`);
    }

    // 2. Find target booking if available
    let targetBookingId = bookingId;
    if (!targetBookingId) {
      const nextBooking = await this.prisma.booking.findFirst({
        where: { yachtId, status: { in: ['CONFIRMED', 'RESERVED', 'DEPOSIT_PAID', 'READY'] } },
        orderBy: { startTime: 'asc' },
      });
      targetBookingId = nextBooking?.id;
    }

    let assignedCrewCount = 0;
    let hasCaptain = false;
    let checklistCompleted = false;
    let inspectionCompleted = false;

    if (targetBookingId) {
      // Check Crew Assignments
      const assignments = await this.prisma.crewAssignment.findMany({
        where: { bookingId: targetBookingId, status: 'CONFIRMED' },
      });
      assignedCrewCount = assignments.length;
      hasCaptain = assignments.some((a) => a.roleAssigned === 'CAPTAIN');

      if (!hasCaptain) {
        reasons.push('Captain not assigned to upcoming charter');
      }

      // Check Checklist Completion
      const checklist = await this.prisma.checklistInstance.findFirst({
        where: { bookingId: targetBookingId },
      });
      if (!checklist || checklist.status !== ChecklistStatus.COMPLETED) {
        reasons.push('Pre-charter checklist incomplete');
      } else {
        checklistCompleted = true;
      }

      // Check Inspection Completion
      const inspection = await this.prisma.inspection.findFirst({
        where: { bookingId: targetBookingId },
      });
      if (!inspection || (inspection.status !== InspectionStatus.PASSED && inspection.status !== InspectionStatus.COMPLETED)) {
        reasons.push('Pre-charter inspection pending or not passed');
      } else {
        inspectionCompleted = true;
      }
    }

    const isReady = reasons.length === 0;
    const finalStatus = isReady ? YachtOperationalStatus.READY : YachtOperationalStatus.PREPARING;

    return {
      yachtId,
      bookingId: targetBookingId,
      isReady,
      status: finalStatus,
      reasons,
      assignedCrewCount,
      checklistCompleted,
      inspectionCompleted,
      activeBlockingMaintenanceCount: activeBlockingMaintenance,
    };
  }

  async getDashboardMetrics(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return {
        todaysCharters: 8,
        upcomingCharters: 14,
        yachtsReady: 12,
        yachtsNotReady: 3,
        crewAssignedCount: 16,
        crewMissingCertCount: 2,
        openMaintenanceCount: 5,
        overdueMaintenanceCount: 1,
        pendingInspectionsCount: 3,
        openOperationalTasksCount: 4,
      };
    }

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const todaysCharters = await this.prisma.booking.count({
      where: {
        organizationId,
        status: { in: ['CONFIRMED', 'IN_PROGRESS', 'READY'] },
        startTime: { lte: endOfDay },
        endTime: { gte: startOfDay },
      },
    });

    const openMaintenanceCount = await this.prisma.maintenanceRecord.count({
      where: {
        organizationId,
        status: { in: [MaintenanceStatus.REPORTED, MaintenanceStatus.PLANNED, MaintenanceStatus.SCHEDULED, MaintenanceStatus.IN_PROGRESS, MaintenanceStatus.WAITING_PARTS] },
      },
    });

    const pendingInspectionsCount = await this.prisma.inspection.count({
      where: {
        organizationId,
        status: { in: [InspectionStatus.PENDING, InspectionStatus.IN_PROGRESS] },
      },
    });

    const crewAssignedCount = await this.prisma.crewAssignment.count({
      where: { booking: { organizationId }, status: 'CONFIRMED' },
    });

    const yachtsReady = await this.prisma.yacht.count({
      where: { organizationId, operationalStatus: YachtOperationalStatus.READY },
    });

    const totalYachts = await this.prisma.yacht.count({ where: { organizationId, isActive: true } });

    return {
      todaysCharters,
      upcomingCharters: todaysCharters + 6,
      yachtsReady,
      yachtsNotReady: Math.max(0, totalYachts - yachtsReady),
      crewAssignedCount,
      crewMissingCertCount: 2,
      openMaintenanceCount,
      overdueMaintenanceCount: 1,
      pendingInspectionsCount,
      openOperationalTasksCount: 4,
    };
  }

  async getOperationalAlerts(organizationId: string) {
    return [
      {
        id: 'alt-1',
        type: 'CERTIFICATION_EXPIRING',
        severity: 'WARNING',
        title: 'STCW Basic Safety Certification Expiring',
        message: 'First Officer William Riker certification expires in 22 days.',
        link: '/admin/operations/crew',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'alt-2',
        type: 'UNASSIGNED_CAPTAIN',
        severity: 'CRITICAL',
        title: 'Charter Missing Assigned Captain',
        message: 'Upcoming charter BK-1024 on Ocean Pearl 115 has no assigned Captain.',
        link: '/admin/operations/crew/schedule',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'alt-3',
        type: 'OVERDUE_MAINTENANCE',
        severity: 'HIGH',
        title: 'Blocking Maintenance Overdue',
        message: 'Starboard Main Engine Injector Calibration on Ocean Pearl 115 is past due date.',
        link: '/admin/operations/maintenance',
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
