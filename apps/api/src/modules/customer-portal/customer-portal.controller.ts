import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CustomerPortalService } from './customer-portal.service';
import { ConciergeService } from './concierge.service';
import { SupportTicketsService } from './support-tickets.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('portal')
@UseGuards(TenantGuard)
export class CustomerPortalController {
  constructor(
    private readonly portalService: CustomerPortalService,
    private readonly conciergeService: ConciergeService,
    private readonly supportService: SupportTicketsService,
  ) {}

  @Get('summary')
  async getSummary(@Query('customerId') customerId?: string) {
    const data = await this.portalService.getPortalSummary(customerId || 'cust-1');
    return { success: true, data };
  }

  @Get('bookings/:id')
  async getBookingDetail(@Param('id') bookingId: string, @Query('customerId') customerId?: string) {
    const data = await this.portalService.getBookingDetail(customerId || 'cust-1', bookingId);
    return { success: true, data };
  }

  @Post('bookings/revalidate-checkout')
  async revalidateCheckout(@Body() dto: { yachtId: string; startDate: string; endDate: string }, @Query('customerId') customerId?: string) {
    const data = await this.portalService.revalidateAndCheckout(customerId || 'cust-1', dto.yachtId, dto.startDate, dto.endDate);
    return { success: true, data };
  }

  @Post('ai-chat')
  async aiChat(@Body() dto: { prompt: string }, @Query('customerId') customerId?: string) {
    const data = await this.portalService.processCustomerAiQuery(customerId || 'cust-1', dto.prompt);
    return { success: true, data };
  }

  @Get('concierge')
  async getConciergeRequests(@Query('customerId') customerId?: string) {
    const data = await this.conciergeService.findConciergeRequests(customerId || 'cust-1');
    return { success: true, data };
  }

  @Post('concierge')
  async createConciergeRequest(@CurrentTenant() organizationId: string, @Body() dto: any, @Query('customerId') customerId?: string) {
    const data = await this.conciergeService.createConciergeRequest(organizationId || 'org-1', customerId || 'cust-1', dto);
    return { success: true, data };
  }

  @Post('services/request')
  async createServiceRequest(@CurrentTenant() organizationId: string, @Body() dto: any, @Query('customerId') customerId?: string) {
    const data = await this.conciergeService.createServiceRequest(organizationId || 'org-1', customerId || 'cust-1', dto);
    return { success: true, data };
  }

  @Get('support')
  async getTickets(@Query('customerId') customerId?: string) {
    const data = await this.supportService.findTickets(customerId || 'cust-1');
    return { success: true, data };
  }

  @Post('events/:id/register')
  async registerEvent(@Param('id') eventId: string, @Query('customerId') customerId?: string) {
    const data = await this.supportService.registerForEventOrWaitlist(eventId, customerId || 'cust-1');
    return { success: true, data };
  }
}
