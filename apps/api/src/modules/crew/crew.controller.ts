import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CrewService } from './crew.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('crew')
@UseGuards(TenantGuard)
export class CrewController {
  constructor(private readonly crewService: CrewService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.crewService.findAll(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@CurrentTenant() organizationId: string, @Param('id') id: string) {
    const data = await this.crewService.findOne(organizationId || 'org-1', id);
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.crewService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Post(':id/certifications')
  async addCertification(
    @CurrentTenant() organizationId: string,
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    const data = await this.crewService.addCertification(organizationId || 'org-1', id, dto);
    return { success: true, data };
  }

  @Post(':id/licenses')
  async addLicense(
    @CurrentTenant() organizationId: string,
    @Param('id') id: string,
    @Body() dto: any,
  ) {
    const data = await this.crewService.addLicense(organizationId || 'org-1', id, dto);
    return { success: true, data };
  }
}
