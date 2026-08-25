import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { CrmLeadsService } from './crm-leads.service';
import { CrmActivitiesService } from './crm-activities.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('crm')
@UseGuards(TenantGuard)
export class CrmController {
  constructor(
    private readonly leadsService: CrmLeadsService,
    private readonly activitiesService: CrmActivitiesService,
  ) {}

  @Get('leads')
  async getLeads(@CurrentTenant() organizationId: string) {
    const data = await this.leadsService.findAllLeads(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('leads')
  async createLead(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.leadsService.createLead(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Get('leads/check-duplicate')
  async checkDuplicate(@CurrentTenant() organizationId: string, @Query('email') email: string, @Query('phone') phone?: string) {
    const data = await this.leadsService.checkDuplicateCustomer(organizationId || 'org-1', email, phone);
    return { success: true, data };
  }

  @Post('leads/:id/convert')
  async convertLead(@CurrentTenant() organizationId: string, @Param('id') leadId: string, @Body() dto: { targetCustomerId?: string }) {
    const data = await this.leadsService.convertLeadToCustomer(organizationId || 'org-1', leadId, dto?.targetCustomerId);
    return { success: true, data };
  }

  @Get('activities')
  async getActivities(@CurrentTenant() organizationId: string, @Query('leadId') leadId?: string, @Query('customerId') customerId?: string) {
    const data = await this.activitiesService.findAllActivities(organizationId || 'org-1', leadId, customerId);
    return { success: true, data };
  }

  @Get('follow-ups')
  async getFollowUps(@CurrentTenant() organizationId: string) {
    const data = await this.activitiesService.findFollowUps(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('follow-ups')
  async createFollowUp(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.activitiesService.createFollowUp(organizationId || 'org-1', dto);
    return { success: true, data };
  }
}
