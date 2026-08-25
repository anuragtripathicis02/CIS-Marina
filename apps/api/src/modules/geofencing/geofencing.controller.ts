import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { GeofencingService } from './geofencing.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('geofences')
@UseGuards(TenantGuard)
export class GeofencingController {
  constructor(private readonly geofencingService: GeofencingService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string, @Query('yachtId') yachtId?: string) {
    const data = await this.geofencingService.findAll(organizationId || 'org-1', yachtId);
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.geofencingService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Get('events')
  async findEvents(@CurrentTenant() organizationId: string, @Query('yachtId') yachtId?: string) {
    const data = await this.geofencingService.findEvents(organizationId || 'org-1', yachtId);
    return { success: true, data };
  }
}
