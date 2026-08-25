import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { BerthReservationsService } from './berth-reservations.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('berth-reservations')
@UseGuards(TenantGuard)
export class BerthReservationsController {
  constructor(private readonly reservationsService: BerthReservationsService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string, @Query('marinaId') marinaId?: string) {
    const data = await this.reservationsService.findAll(organizationId || 'org-1', marinaId);
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.reservationsService.createReservation(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Post(':id/check-in')
  async checkIn(@Param('id') id: string, @Body() dto: { staffUserId?: string; conditionRating?: number; conditionNotes?: string }) {
    const data = await this.reservationsService.processCheckIn(id, dto.staffUserId, dto.conditionRating, dto.conditionNotes);
    return { success: true, data };
  }

  @Post(':id/check-out')
  async checkOut(@Param('id') id: string, @Body() dto: { staffUserId?: string; conditionRating?: number; conditionNotes?: string }) {
    const data = await this.reservationsService.processCheckOut(id, dto.staffUserId, dto.conditionRating, dto.conditionNotes);
    return { success: true, data };
  }
}
