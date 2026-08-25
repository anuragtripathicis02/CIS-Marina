import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RevenueAnalyticsService } from './revenue-analytics.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('revenue')
@UseGuards(TenantGuard)
export class RevenueAnalyticsController {
  constructor(private readonly revenueService: RevenueAnalyticsService) {}

  @Get('summary')
  async getSummary(@CurrentTenant() organizationId: string) {
    const data = await this.revenueService.getRevenueSummary(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('approve-recommendation')
  async approveRecommendation(
    @CurrentTenant() organizationId: string,
    @Body() dto: { targetId: string; newPrice: number; managerNotes?: string },
  ) {
    const data = await this.revenueService.approvePricingRecommendation(organizationId || 'org-1', dto);
    return { success: true, data };
  }
}
