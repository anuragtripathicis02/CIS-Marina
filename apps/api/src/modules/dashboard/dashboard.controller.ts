import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('SaaS Dashboard Analytics')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  @ApiOperation({ summary: 'Get real-time executive dashboard KPIs and metrics' })
  async getMetrics(@CurrentTenant() orgId?: string): Promise<IApiResponse> {
    const data = await this.dashboardService.getMetrics(orgId);
    return {
      success: true,
      data,
      meta: { timestamp: new Date().toISOString(), correlationId: `dash-${Date.now()}` },
    };
  }
}
