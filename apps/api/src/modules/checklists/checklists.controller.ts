import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ChecklistsService } from './checklists.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { ChecklistItemResult } from '@yacht-platform/types';

@Controller('checklists')
@UseGuards(TenantGuard)
export class ChecklistsController {
  constructor(private readonly checklistsService: ChecklistsService) {}

  @Get('templates')
  async findAllTemplates(@CurrentTenant() organizationId: string) {
    const data = await this.checklistsService.findAllTemplates(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('instances')
  async findInstances(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId?: string,
    @Query('bookingId') bookingId?: string,
  ) {
    const data = await this.checklistsService.findInstances(organizationId || 'org-1', yachtId, bookingId);
    return { success: true, data };
  }

  @Post('instances')
  async createInstance(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.checklistsService.createInstance(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Patch('items/:itemId')
  async updateItemResult(
    @CurrentTenant() organizationId: string,
    @Param('itemId') itemId: string,
    @Body('result') result: ChecklistItemResult,
    @Body('notes') notes?: string,
  ) {
    const data = await this.checklistsService.updateItemResult(organizationId || 'org-1', itemId, result, notes);
    return { success: true, data };
  }
}
