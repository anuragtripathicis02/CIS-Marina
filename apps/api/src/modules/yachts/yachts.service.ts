import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { Currency } from '@yacht-platform/types';
import { randomUUID } from 'crypto';

@Injectable()
export class YachtsService {
  constructor(private readonly prisma: PrismaService) {}

  async createYacht(organizationId: string, dto: CreateYachtDto) {
    return this.prisma.yacht.create({
      data: {
        id: randomUUID(),
        organizationId,
        name: dto.name,
        registrationNumber: dto.registrationNumber,
        make: dto.make,
        model: dto.model,
        yearBuilt: dto.yearBuilt,
        lengthFt: dto.lengthFt,
        capacityPassengers: dto.capacityPassengers,
        cabins: dto.cabins || 0,
        bathrooms: dto.bathrooms || 0,
        hourlyRate: dto.hourlyRate,
        dailyRate: dto.dailyRate,
        currency: (dto.currency as Currency) || Currency.USD,
        isActive: true,
      },
    });
  }

  async getYachts(organizationId?: string) {
    const where = organizationId ? { organizationId, isActive: true } : { isActive: true };
    return this.prisma.yacht.findMany({
      where,
      include: {
        images: true,
        homePort: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getYachtById(id: string, organizationId?: string) {
    const where = organizationId ? { id, organizationId } : { id };
    const yacht = await this.prisma.yacht.findFirst({
      where,
      include: {
        images: true,
        availability: true,
        homePort: true,
      },
    });

    if (!yacht) {
      throw new NotFoundException('Yacht not found or unauthorized.');
    }

    return yacht;
  }
}
