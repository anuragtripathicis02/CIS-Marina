import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Currency } from '@yacht-platform/types';

@Injectable()
export class MarinaServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        { id: 'ms-1', organizationId, name: 'Shore Power (3-Phase 100A Connection)', category: 'Utilities', pricingModel: 'PER_NIGHT', unitPrice: 75, currency: Currency.EUR, isActive: true },
        { id: 'ms-2', organizationId, name: 'Fresh Potable Water Connection', category: 'Utilities', pricingModel: 'PER_NIGHT', unitPrice: 35, currency: Currency.EUR, isActive: true },
        { id: 'ms-3', organizationId, name: 'Blackwater & Sewage Pump-out Service', category: 'Sanitation', pricingModel: 'PER_USAGE', unitPrice: 120, currency: Currency.EUR, isActive: true },
        { id: 'ms-4', organizationId, name: 'Premium High-Speed Marine Wi-Fi', category: 'Connectivity', pricingModel: 'PER_NIGHT', unitPrice: 25, currency: Currency.EUR, isActive: true },
        { id: 'ms-5', organizationId, name: 'Daily Exterior Hull Washdown', category: 'Maintenance', pricingModel: 'PER_DAY', unitPrice: 150, currency: Currency.EUR, isActive: true },
        { id: 'ms-6', organizationId, name: 'Dockside Laundry & Linen Service', category: 'Concierge', pricingModel: 'PER_USAGE', unitPrice: 90, currency: Currency.EUR, isActive: true },
      ];
    }

    return this.prisma.marinaService.findMany({
      where: { organizationId, isActive: true },
      orderBy: { category: 'asc' },
    });
  }

  async create(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `ms-${Date.now()}`,
        organizationId,
        ...dto,
        currency: dto.currency || Currency.USD,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.marinaService.create({
      data: {
        organizationId,
        name: dto.name,
        category: dto.category,
        pricingModel: dto.pricingModel || 'PER_NIGHT',
        unitPrice: parseFloat(dto.unitPrice),
        currency: dto.currency || Currency.USD,
        isActive: true,
      },
    });
  }
}
