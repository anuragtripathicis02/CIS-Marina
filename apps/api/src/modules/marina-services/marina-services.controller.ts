import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MarinaServicesService } from './marina-services.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('marina-services')
@UseGuards(TenantGuard)
export class MarinaServicesController {
  constructor(private readonly servicesService: MarinaServicesService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.servicesService.findAll(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.servicesService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }
}
