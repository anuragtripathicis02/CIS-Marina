import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { ContractStatus, ContractType, Currency } from '@yacht-platform/types';

@Injectable()
export class MarinaContractsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'mc-101',
          organizationId,
          marinaId: 'mar-1',
          berthId: 'b-101',
          customerId: 'cust-1',
          vesselId: 'mv-1',
          contractNumber: 'MC-2026-0042',
          type: ContractType.LONG_TERM,
          startDate: '2026-01-01T00:00:00.000Z',
          endDate: '2026-12-31T23:59:59.000Z',
          price: 95000,
          currency: Currency.EUR,
          status: ContractStatus.ACTIVE,
          terms: 'Standard 12-Month Mediterranean Long-Term Berth Tenancy Lease Agreement.',
          berth: { berthNumber: 'A-01' },
          vessel: { vesselName: 'Ocean Pearl 115' },
          customer: { firstName: 'Arthur', lastName: 'Sterling' },
          createdAt: new Date().toISOString(),
        },
        {
          id: 'mc-102',
          organizationId,
          marinaId: 'mar-1',
          berthId: 'b-103',
          customerId: 'cust-2',
          vesselId: 'mv-2',
          contractNumber: 'MC-2026-0089',
          type: ContractType.SEASONAL,
          startDate: '2026-05-01T00:00:00.000Z',
          endDate: '2026-09-30T23:59:59.000Z',
          price: 32000,
          currency: Currency.EUR,
          status: ContractStatus.ACTIVE,
          terms: 'Summer Mediterranean High-Season Berth Agreement.',
          berth: { berthNumber: 'A-03' },
          vessel: { vesselName: 'Azure Horizon 88' },
          customer: { firstName: 'Elena', lastName: 'Rostova' },
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.marinaContract.findMany({
      where: { organizationId },
      include: { berth: true, vessel: true, customer: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `mc-${Date.now()}`,
        organizationId,
        ...dto,
        contractNumber: `MC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        status: dto.status || ContractStatus.ACTIVE,
        currency: dto.currency || Currency.USD,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.marinaContract.create({
      data: {
        organizationId,
        marinaId: dto.marinaId,
        berthId: dto.berthId,
        customerId: dto.customerId,
        vesselId: dto.vesselId,
        contractNumber: `MC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        type: dto.type || ContractType.SHORT_TERM,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        price: parseFloat(dto.price),
        currency: dto.currency || Currency.USD,
        status: dto.status || ContractStatus.ACTIVE,
        terms: dto.terms,
      },
    });
  }
}
