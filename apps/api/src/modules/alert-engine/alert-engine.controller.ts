import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { AlertEngineService } from './alert-engine.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AlertStatus } from '@yacht-platform/types';

@Controller('alerts')
@UseGuards(TenantGuard)
export class AlertEngineController {
  constructor(private readonly alertService: AlertEngineService) {}

  @Get()
  async findAllAlerts(
    @CurrentTenant() organizationId: string,
    @Query('yachtId') yachtId?: string,
    @Query('status') status?: AlertStatus,
  ) {
    const data = await this.alertService.findAllAlerts(organizationId || 'org-1', yachtId, status);
    return { success: true, data };
  }

  @Get('rules')
  async findAllRules(@CurrentTenant() organizationId: string) {
    const data = await this.alertService.findAllRules(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('rules')
  async createRule(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.alertService.createRule(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Patch(':id/status')
  async transitionStatus(
    @CurrentTenant() organizationId: string,
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body('status') status: AlertStatus,
    @Body('notes') notes?: string,
  ) {
    const data = await this.alertService.transitionAlertStatus(organizationId || 'org-1', id, status, userId, notes);
    return { success: true, data };
  }

  @Post(':id/recommend-maintenance')
  async recommendMaintenance(
    @CurrentTenant() organizationId: string,
    @Param('id') id: string,
  ) {
    const data = await this.alertService.convertAlertToMaintenanceRecommendation(organizationId || 'org-1', id);
    return { success: true, data };
  }
}
