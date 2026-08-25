import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { DeviceStatus } from '@yacht-platform/types';

@Controller('devices')
@UseGuards(TenantGuard)
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  async findAll(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId?: string,
  ) {
    const data = await this.devicesService.findAll(organizationId || 'org-1', yachtId);
    return { success: true, data };
  }

  @Get(':id')
  async findOne(@CurrentTenant() organizationId: string, @Param('id') id: string) {
    const data = await this.devicesService.findOne(organizationId || 'org-1', id);
    return { success: true, data };
  }

  @Post('register')
  async registerDevice(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.devicesService.registerDevice(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Patch(':id/status')
  async updateStatus(
    @CurrentTenant() organizationId: string,
    @Param('id') id: string,
    @Body('status') status: DeviceStatus,
  ) {
    const data = await this.devicesService.updateStatus(organizationId || 'org-1', id, status);
    return { success: true, data };
  }
}
