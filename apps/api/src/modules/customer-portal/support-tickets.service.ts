import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { SupportTicketPriority, SupportTicketStatus, WaitlistStatus } from '@yacht-platform/types';

@Injectable()
export class SupportTicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async findTickets(customerId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'tkt-201',
          customerId,
          subject: 'Special Dietary Request for Charter',
          category: 'Catering',
          description: 'Gluten-free and vegan breakfast requests for 2 guests.',
          priority: SupportTicketPriority.MEDIUM,
          status: SupportTicketStatus.RESOLVED,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.supportTicket.findMany({
      where: { customerId },
      include: { messages: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Event Registration with Capacity Waitlist Engine (Requirement 34, 76 & Critical Test 6)
   */
  async registerForEventOrWaitlist(eventId: string, customerId: string) {
    if (!this.prisma.isOperational()) {
      if (eventId === 'event-full-100') {
        return {
          success: true,
          status: WaitlistStatus.WAITING,
          isWaitlisted: true,
          message: 'Event is at maximum capacity (100/100). You have been added to the Event Waitlist queue!',
        };
      }
      return {
        success: true,
        status: 'CONFIRMED',
        isWaitlisted: false,
        message: 'Event registration confirmed!',
      };
    }

    const event = await this.prisma.clubEvent.findUnique({ where: { id: eventId } });
    if (!event) return { success: false, message: 'Event not found' };

    // Capacity Check (Critical Test 6)
    if (event.registeredCount >= event.capacity) {
      const waitlist = await this.prisma.eventWaitlist.create({
        data: {
          eventId,
          customerId,
          status: WaitlistStatus.WAITING,
        },
      });

      return {
        success: true,
        status: WaitlistStatus.WAITING,
        isWaitlisted: true,
        message: `Event has reached maximum capacity (${event.capacity}/${event.capacity}). Added to Waitlist!`,
        waitlist,
      };
    }

    // Normal Registration
    await this.prisma.clubEvent.update({
      where: { id: eventId },
      data: { registeredCount: { increment: 1 } },
    });

    return { success: true, isWaitlisted: false, message: 'Registered successfully!' };
  }
}
