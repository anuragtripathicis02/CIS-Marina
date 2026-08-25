import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { BookingStatus, Currency, PaymentStatus } from '@yacht-platform/types';
import { randomUUID } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPaymentIntent(orgId: string, dto: CreatePaymentIntentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: dto.bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found for payment.');
    }

    const organizationId = orgId || booking.organizationId;
    const paymentRef = `PAY-${Math.floor(10000 + Math.random() * 90000)}`;

    const payment = await this.prisma.payment.create({
      data: {
        id: randomUUID(),
        organizationId,
        bookingId: booking.id,
        paymentReference: paymentRef,
        provider: 'STRIPE',
        providerTransactionId: `pi_test_${randomUUID().substring(0, 12)}`,
        amount: dto.amount,
        currency: (dto.currency as Currency) || booking.currency,
        status: PaymentStatus.CAPTURED,
        paymentMethod: 'credit_card',
      },
    });

    // Advance booking status to DEPOSIT_PAID or CONFIRMED
    await this.prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: BookingStatus.DEPOSIT_PAID,
        statusLog: {
          create: {
            id: randomUUID(),
            fromStatus: booking.status,
            toStatus: BookingStatus.DEPOSIT_PAID,
            notes: `Stripe payment captured (${payment.currency} ${payment.amount}). Ref: ${payment.paymentReference}`,
          },
        },
      },
    });

    // Generate Invoice Record
    const invNumber = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    await this.prisma.invoice.create({
      data: {
        id: randomUUID(),
        organizationId,
        bookingId: booking.id,
        invoiceNumber: invNumber,
        subtotalAmount: booking.subtotalAmount,
        taxAmount: booking.taxAmount,
        totalAmount: booking.totalAmount,
        paidAmount: dto.amount,
        currency: booking.currency,
        dueDate: new Date(Date.now() + 86400000 * 7),
      },
    });

    return {
      payment,
      clientSecret: `pi_test_secret_${randomUUID()}`,
    };
  }

  async getPayments(organizationId?: string) {
    const where = organizationId ? { organizationId } : {};
    return this.prisma.payment.findMany({
      where,
      include: {
        booking: {
          include: { customer: true, yacht: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
