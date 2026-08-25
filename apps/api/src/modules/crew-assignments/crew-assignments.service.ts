import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class CrewAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async assignCrewToBooking(organizationId: string, dto: {
    bookingId: string;
    crewMemberId: string;
    roleAssigned: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }) {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    if (!this.prisma.isOperational()) {
      return {
        id: `assign-${Date.now()}`,
        bookingId: dto.bookingId,
        crewMemberId: dto.crewMemberId,
        roleAssigned: dto.roleAssigned,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status: 'CONFIRMED',
        notes: dto.notes,
        createdAt: new Date().toISOString(),
      };
    }

    // 1. Verify Booking & Crew Member existence
    const booking = await this.prisma.booking.findFirst({
      where: { id: dto.bookingId, organizationId },
    });
    if (!booking) throw new NotFoundException(`Booking #${dto.bookingId} not found`);

    const crewMember = await this.prisma.crewMember.findFirst({
      where: { id: dto.crewMemberId, organizationId },
    });
    if (!crewMember) throw new NotFoundException(`Crew member #${dto.crewMemberId} not found`);

    // 2. Conflict Protection: Check for overlapping assignments for this crew member
    const existingConflict = await this.prisma.crewAssignment.findFirst({
      where: {
        crewMemberId: dto.crewMemberId,
        status: 'CONFIRMED',
        AND: [
          { startTime: { lt: endTime } },
          { endTime: { gt: startTime } },
        ],
      },
      include: { booking: true },
    });

    if (existingConflict) {
      throw new ConflictException(
        `Crew Member ${crewMember.firstName} ${crewMember.lastName} is already assigned to Booking #${existingConflict.booking.bookingReference} during this timeframe (${existingConflict.startTime.toISOString()} - ${existingConflict.endTime.toISOString()}).`
      );
    }

    // 3. Create Assignment & update Crew status to ASSIGNED
    const assignment = await this.prisma.crewAssignment.create({
      data: {
        bookingId: dto.bookingId,
        crewMemberId: dto.crewMemberId,
        roleAssigned: dto.roleAssigned,
        startTime,
        endTime,
        status: 'CONFIRMED',
        notes: dto.notes,
      },
      include: {
        crewMember: true,
        booking: { include: { yacht: true } },
      },
    });

    await this.prisma.crewMember.update({
      where: { id: dto.crewMemberId },
      data: { status: 'ASSIGNED' },
    });

    return assignment;
  }

  async findByBooking(organizationId: string, bookingId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'assign-1',
          bookingId,
          crewMemberId: 'crew-1',
          roleAssigned: 'CAPTAIN',
          startTime: new Date().toISOString(),
          endTime: new Date(Date.now() + 86400000).toISOString(),
          status: 'CONFIRMED',
          crewMember: {
            id: 'crew-1',
            firstName: 'Jean-Luc',
            lastName: 'Picard',
            role: 'CAPTAIN',
            status: 'ASSIGNED',
          },
        },
      ];
    }

    return this.prisma.crewAssignment.findMany({
      where: { bookingId, booking: { organizationId } },
      include: {
        crewMember: {
          include: { certifications: true },
        },
      },
    });
  }

  async removeAssignment(organizationId: string, id: string) {
    if (!this.prisma.isOperational()) {
      return { success: true, removedId: id };
    }

    const assignment = await this.prisma.crewAssignment.findFirst({
      where: { id, booking: { organizationId } },
    });
    if (!assignment) throw new NotFoundException(`Assignment #${id} not found`);

    await this.prisma.crewAssignment.delete({ where: { id } });

    // Check if crew has any other active assignments
    const remaining = await this.prisma.crewAssignment.count({
      where: { crewMemberId: assignment.crewMemberId, status: 'CONFIRMED' },
    });
    if (remaining === 0) {
      await this.prisma.crewMember.update({
        where: { id: assignment.crewMemberId },
        data: { status: 'AVAILABLE' },
      });
    }

    return { success: true };
  }
}
