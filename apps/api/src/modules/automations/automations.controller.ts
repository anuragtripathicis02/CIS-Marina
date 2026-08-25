import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AutomationsService } from './automations.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('automations')
@UseGuards(TenantGuard)
export class AutomationsController {
  constructor(private readonly automationsService: AutomationsService) {}

  @Get()
  async getWorkflows(@CurrentTenant() organizationId: string) {
    const data = await this.automationsService.findAllWorkflows(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post(':id/trigger')
  async trigger(
    @CurrentTenant() organizationId: string,
    @Param('id') workflowId: string,
    @Body() dto: { eventId: string; contextData?: any },
  ) {
    const data = await this.automationsService.triggerWorkflow(organizationId || 'org-1', workflowId, dto.eventId, dto.contextData);
    return { success: true, data };
  }

  @Get('templates')
  async getTemplates(@CurrentTenant() organizationId: string) {
    const data = await this.automationsService.findTemplates(organizationId || 'org-1');
    return { success: true, data };
  }
}
