import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { OnboardOrganizationDto } from './dto/onboard-organization.dto';
import { Currency } from '@yacht-platform/types';
import { randomUUID } from 'crypto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async onboard(userId: string, dto: OnboardOrganizationDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);
    
    const org = await this.prisma.organization.create({
      data: {
        id: randomUUID(),
        name: dto.name,
        slug,
        countryCode: dto.countryCode,
        defaultCurrency: (dto.defaultCurrency as Currency) || Currency.USD,
        timezone: dto.timezone || 'UTC',
      },
    });

    if (userId) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { organizationId: org.id },
      });
    }

    return org;
  }

  async getOrganizationById(id: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id },
      include: {
        locations: true,
        users: true,
      },
    });

    if (!org) {
      throw new NotFoundException('Organization not found.');
    }

    return org;
  }
}
