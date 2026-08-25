import { Injectable, Logger } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { ILead, LeadStatus, LeadSource } from '@yacht-platform/types';
import { randomUUID } from 'crypto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly leadsStore: Map<string, ILead> = new Map();

  async createLead(dto: CreateLeadDto): Promise<ILead> {
    const now = new Date().toISOString();
    const lead: ILead = {
      id: randomUUID(),
      firstName: dto.firstName,
      lastName: dto.lastName,
      company: dto.company,
      businessType: dto.businessType,
      country: dto.country,
      fleetSize: dto.fleetSize,
      locations: dto.locations,
      currentSoftware: dto.currentSoftware,
      challenge: dto.challenge,
      email: dto.email,
      phone: dto.phone,
      message: dto.message,
      source: (dto.source as LeadSource) || LeadSource.WEBSITE,
      status: LeadStatus.NEW,
      score: 50,
      name: `${dto.firstName} ${dto.lastName}`,
      createdAt: now,
      updatedAt: now,
    };

    this.leadsStore.set(lead.id, lead);
    this.logger.log(`New lead registered: ${lead.company} (${lead.email}) [ID: ${lead.id}]`);
    return lead;
  }

  async getAllLeads(): Promise<ILead[]> {
    return Array.from(this.leadsStore.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async getLeadById(id: string): Promise<ILead | null> {
    return this.leadsStore.get(id) || null;
  }
}
