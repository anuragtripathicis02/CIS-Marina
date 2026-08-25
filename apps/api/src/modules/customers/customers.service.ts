import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCustomer(organizationId: string, dto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        id: randomUUID(),
        organizationId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phoneNumber: dto.phoneNumber,
        nationality: dto.nationality,
        vipStatus: dto.vipStatus || false,
      },
    });
  }

  async getCustomers(organizationId?: string) {
    const where = organizationId ? { organizationId } : {};
    return this.prisma.customer.findMany({
      where,
      include: {
        bookings: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCustomerById(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            yacht: true,
            payments: true,
          },
        },
      },
    });

    if (!customer) {
      throw new NotFoundException('Customer record not found.');
    }

    return customer;
  }
}
