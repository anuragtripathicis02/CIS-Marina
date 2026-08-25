import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { YachtClubService } from './yacht-club.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('yacht-club')
@UseGuards(TenantGuard)
export class YachtClubController {
  constructor(private readonly clubService: YachtClubService) {}

  @Get('plans')
  async getPlans(@CurrentTenant() organizationId: string) {
    const data = await this.clubService.findMembershipPlans(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('members')
  async getMembers(@CurrentTenant() organizationId: string) {
    const data = await this.clubService.findMembers(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('events')
  async getEvents(@CurrentTenant() organizationId: string) {
    const data = await this.clubService.findEvents(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('events/:id/register')
  async registerEvent(@Param('id') eventId: string, @Body() dto: { memberId: string }) {
    const data = await this.clubService.registerForEvent(eventId, dto.memberId);
    return { success: true, data };
  }
}
