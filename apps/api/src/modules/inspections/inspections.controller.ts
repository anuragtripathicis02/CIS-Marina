import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { InspectionItemResult } from '@yacht-platform/types';

@Controller('inspections')
@UseGuards(TenantGuard)
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Get()
  async findAll(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId?: string,
    @Query('bookingId') bookingId?: string,
  ) {
    const data = await this.inspectionsService.findAll(organizationId || 'org-1', yachtId, bookingId);
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.inspectionsService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Patch('items/:itemId')
  async evaluateItem(
    @CurrentTenant() organizationId: string,
    @Param('itemId') itemId: string,
    @Body('result') result: InspectionItemResult,
    @Body('notes') notes?: string,
    @Body('createMaintenanceIfFailed') createMaintenanceIfFailed?: boolean,
  ) {
    const data = await this.inspectionsService.evaluateItem(organizationId || 'org-1', itemId, {
      result,
      notes,
      createMaintenanceIfFailed,
    });
    return { success: true, data };
  }
}
