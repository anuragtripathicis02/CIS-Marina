import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Currency, IBranch } from '@yacht-platform/types';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  async findBranches(organizationId: string): Promise<IBranch[]> {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'br-monaco',
          organizationId,
          name: 'Monaco Flagship Operations Branch',
          code: 'MC-01',
          country: 'Monaco',
          region: 'Côte d\'Azur',
          address: 'Port Hercules Quay Antoine 1er, 98000 Monaco',
          timezone: 'Europe/Monaco',
          currency: Currency.EUR,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'br-dubai',
          organizationId,
          name: 'Dubai Marina & Middle East Branch',
          code: 'DXB-02',
          country: 'United Arab Emirates',
          region: 'Dubai',
          address: 'Dubai Marina Promenade, Pier 7, Dubai',
          timezone: 'Asia/Dubai',
          currency: Currency.AED,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'br-london',
          organizationId,
          name: 'London Corporate Headquarters',
          code: 'LDN-03',
          country: 'United Kingdom',
          region: 'Greater London',
          address: 'St Katharine Docks, London E1W 1LA',
          timezone: 'Europe/London',
          currency: Currency.GBP,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    }

    const branches = await this.prisma.branch.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'asc' },
    });

    return branches as unknown as IBranch[];
  }

  async createBranch(organizationId: string, dto: any): Promise<IBranch> {
    if (!this.prisma.isOperational()) {
      return {
        id: `br-${Date.now()}`,
        organizationId,
        name: dto.name,
        code: dto.code || 'BR-NEW',
        country: dto.country || 'France',
        region: dto.region,
        address: dto.address || 'Standard Harbor Address',
        timezone: dto.timezone || 'UTC',
        currency: dto.currency || Currency.EUR,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    const branch = await this.prisma.branch.create({
      data: {
        organizationId,
        name: dto.name,
        code: dto.code,
        country: dto.country,
        region: dto.region,
        address: dto.address,
        timezone: dto.timezone || 'UTC',
        currency: dto.currency || Currency.USD,
        isActive: true,
      },
    });

    return branch as unknown as IBranch;
  }
}
