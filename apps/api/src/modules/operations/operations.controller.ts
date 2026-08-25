import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { OperationsService } from './operations.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('operations')
@UseGuards(TenantGuard)
export class OperationsController {
  constructor(private readonly operationsService: OperationsService) {}

  @Get('dashboard')
  async getDashboardMetrics(@CurrentTenant() organizationId: string) {
    const data = await this.operationsService.getDashboardMetrics(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('alerts')
  async getAlerts(@CurrentTenant() organizationId: string) {
    const data = await this.operationsService.getOperationalAlerts(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('readiness/:yachtId')
  async getReadiness(
    @CurrentTenant() organizationId: string,
    @Param('yachtId') yachtId: string,
    @Query('bookingId') bookingId?: string,
  ) {
    const data = await this.operationsService.calculateYachtReadiness(organizationId || 'org-1', yachtId, bookingId);
    return { success: true, data };
  }
}
