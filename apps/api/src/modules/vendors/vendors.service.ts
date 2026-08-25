import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'v1',
          organizationId,
          name: 'Monaco Marine Yard & Services',
          category: 'MAINTENANCE',
          contactName: 'Henri Laurent',
          email: 'henri@monacomarine.com',
          phone: '+33 4 93 12 34 56',
          location: 'Port Hercules, Monaco',
          services: 'Hull Repair, Engine Overhaul, Haul Out',
          status: 'ACTIVE',
        },
        {
          id: 'v2',
          organizationId,
          name: 'Riviera Gourmet Yacht Catering',
          category: 'CATERING',
          contactName: 'Chef Francois',
          email: 'catering@rivieragourmet.com',
          phone: '+33 6 55 44 33 22',
          location: 'Nice, France',
          services: 'VIP Dining, Provisions, Fine Wine',
          status: 'ACTIVE',
        },
        {
          id: 'v3',
          organizationId,
          name: 'Blue Water Safety & Life Rafts',
          category: 'MARINE_SERVICES',
          contactName: 'Mark Stevens',
          email: 'service@bluewatersafety.com',
          phone: '+44 20 7946 0912',
          location: 'Southampton, UK',
          services: 'STCW Liferaft Inspection, Fire Equipment',
          status: 'ACTIVE',
        },
      ];
    }

    return this.prisma.vendor.findMany({
      where: { organizationId, status: 'ACTIVE' },
      include: { maintenance: true },
      orderBy: { name: 'asc' },
    });
  }

  async create(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `v-${Date.now()}`,
        organizationId,
        ...dto,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.vendor.create({
      data: {
        organizationId,
        name: dto.name,
        category: dto.category || 'MAINTENANCE',
        contactName: dto.contactName,
        email: dto.email,
        phone: dto.phone,
        location: dto.location,
        services: dto.services,
        notes: dto.notes,
      },
    });
  }
}
