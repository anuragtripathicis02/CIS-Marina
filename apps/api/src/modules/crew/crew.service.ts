import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CertStatus, CrewRole, CrewStatus } from '@yacht-platform/types';

@Injectable()
export class CrewService {
  constructor(private readonly prisma: PrismaService) {}

  private computeCertStatus(expiryDate?: Date | string | null): CertStatus {
    if (!expiryDate) return CertStatus.VALID;
    const expiry = new Date(expiryDate).getTime();
    const now = Date.now();
    const daysRemaining = (expiry - now) / (1000 * 60 * 60 * 24);

    if (daysRemaining <= 0) return CertStatus.EXPIRED;
    if (daysRemaining <= 90) return CertStatus.EXPIRING_SOON;
    return CertStatus.VALID;
  }

  async findAll(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'crew-1',
          organizationId,
          firstName: 'Jean-Luc',
          lastName: 'Picard',
          email: 'captain.picard@monacoyachts.com',
          phone: '+33 6 12 34 56 78',
          role: CrewRole.CAPTAIN,
          status: CrewStatus.AVAILABLE,
          nationality: 'French',
          hireDate: '2023-01-15T00:00:00.000Z',
          isActive: true,
          certifications: [
            {
              id: 'c1',
              name: 'Master 3000 GT Commercial License',
              issuingAuthority: 'MCA UK',
              certificateNumber: 'UK-MCA-99482',
              expiryDate: '2027-08-30T00:00:00.000Z',
              status: CertStatus.VALID,
            },
            {
              id: 'c2',
              name: 'STCW Basic Safety Training',
              issuingAuthority: 'French Maritime',
              expiryDate: '2026-09-15T00:00:00.000Z',
              status: CertStatus.EXPIRING_SOON,
            },
          ],
          licenses: [
            {
              id: 'l1',
              name: 'GMDSS Radio Operator License',
              licenseNumber: 'RAD-88341',
              status: CertStatus.VALID,
            },
          ],
        },
        {
          id: 'crew-2',
          organizationId,
          firstName: 'William',
          lastName: 'Riker',
          email: 'firstofficer@monacoyachts.com',
          phone: '+33 6 98 76 54 32',
          role: CrewRole.FIRST_OFFICER,
          status: CrewStatus.ASSIGNED,
          nationality: 'American',
          hireDate: '2023-03-01T00:00:00.000Z',
          isActive: true,
          certifications: [
            {
              id: 'c3',
              name: 'Chief Mate 3000 GT Certificate',
              expiryDate: '2028-12-01T00:00:00.000Z',
              status: CertStatus.VALID,
            },
          ],
        },
        {
          id: 'crew-3',
          organizationId,
          firstName: 'Geordi',
          lastName: 'La Forge',
          email: 'chief.engineer@monacoyachts.com',
          phone: '+33 6 44 55 66 77',
          role: CrewRole.ENGINEER,
          status: CrewStatus.AVAILABLE,
          nationality: 'American',
          hireDate: '2022-11-10T00:00:00.000Z',
          isActive: true,
          certifications: [
            {
              id: 'c4',
              name: 'Chief Engineer Unlimited (Y2)',
              expiryDate: '2025-06-01T00:00:00.000Z',
              status: CertStatus.EXPIRED,
            },
          ],
        },
      ];
    }

    const members = await this.prisma.crewMember.findMany({
      where: { organizationId, isActive: true },
      include: {
        certifications: true,
        licenses: true,
        assignments: {
          include: { booking: true },
        },
      },
      orderBy: { lastName: 'asc' },
    });

    return members.map((m) => ({
      ...m,
      certifications: m.certifications.map((c) => ({
        ...c,
        status: this.computeCertStatus(c.expiryDate),
      })),
    }));
  }

  async findOne(organizationId: string, id: string) {
    if (!this.prisma.isOperational()) {
      const all = await this.findAll(organizationId);
      const found = all.find((c) => c.id === id);
      if (!found) throw new NotFoundException(`Crew member #${id} not found`);
      return found;
    }

    const member = await this.prisma.crewMember.findFirst({
      where: { id, organizationId },
      include: {
        certifications: true,
        licenses: true,
        documents: true,
        assignments: {
          include: { booking: { include: { yacht: true } } },
        },
      },
    });

    if (!member) throw new NotFoundException(`Crew member #${id} not found`);

    return {
      ...member,
      certifications: member.certifications.map((c) => ({
        ...c,
        status: this.computeCertStatus(c.expiryDate),
      })),
    };
  }

  async create(organizationId: string, dto: any) {
    if (!this.prisma.isOperational()) {
      return {
        id: `crew-${Date.now()}`,
        organizationId,
        ...dto,
        status: CrewStatus.AVAILABLE,
        isActive: true,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.crewMember.create({
      data: {
        organizationId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        phone: dto.phone,
        role: dto.role || CrewRole.DECKHAND,
        customRole: dto.customRole,
        nationality: dto.nationality,
        status: CrewStatus.AVAILABLE,
        hireDate: dto.hireDate ? new Date(dto.hireDate) : null,
      },
    });
  }

  async addCertification(organizationId: string, crewMemberId: string, dto: any) {
    const status = this.computeCertStatus(dto.expiryDate);

    if (!this.prisma.isOperational()) {
      return {
        id: `cert-${Date.now()}`,
        crewMemberId,
        ...dto,
        status,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.crewCertification.create({
      data: {
        crewMemberId,
        name: dto.name,
        issuingAuthority: dto.issuingAuthority,
        certificateNumber: dto.certificateNumber,
        issueDate: dto.issueDate ? new Date(dto.issueDate) : null,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        documentUrl: dto.documentUrl,
        status,
      },
    });
  }

  async addLicense(organizationId: string, crewMemberId: string, dto: any) {
    const status = this.computeCertStatus(dto.expiryDate);

    if (!this.prisma.isOperational()) {
      return {
        id: `lic-${Date.now()}`,
        crewMemberId,
        ...dto,
        status,
        createdAt: new Date().toISOString(),
      };
    }

    return this.prisma.crewLicense.create({
      data: {
        crewMemberId,
        name: dto.name,
        licenseNumber: dto.licenseNumber,
        issuingAuthority: dto.issuingAuthority,
        issueDate: dto.issueDate ? new Date(dto.issueDate) : null,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
        documentUrl: dto.documentUrl,
        status,
      },
    });
  }
}
