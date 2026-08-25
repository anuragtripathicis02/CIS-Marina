import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { MaintenanceStatus } from '@yacht-platform/types';

@Controller('maintenance')
@UseGuards(TenantGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.maintenanceService.findAll(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@CurrentTenant() organizationId: string, @Param('id') id: string) {
    const data = await this.maintenanceService.findOne(organizationId || 'org-1', id);
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.maintenanceService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Patch(':id/status')
  async updateStatus(
    @CurrentTenant() organizationId: string,
    @Param('id') id: string,
    @Body('status') status: MaintenanceStatus,
  ) {
    const data = await this.maintenanceService.updateStatus(organizationId || 'org-1', id, status);
    return { success: true, data };
  }
}
