import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CrewAssignmentsService } from './crew-assignments.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('crew/assignments')
@UseGuards(TenantGuard)
export class CrewAssignmentsController {
  constructor(private readonly assignmentsService: CrewAssignmentsService) {}

  @Post()
  async assign(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.assignmentsService.assignCrewToBooking(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Get('booking/:bookingId')
  async findByBooking(@CurrentTenant() organizationId: string, @Param('bookingId') bookingId: string) {
    const data = await this.assignmentsService.findByBooking(organizationId || 'org-1', bookingId);
    return { success: true, data };
  }

  @Delete(':id')
  async remove(@CurrentTenant() organizationId: string, @Param('id') id: string) {
    const data = await this.assignmentsService.removeAssignment(organizationId || 'org-1', id);
    return { success: true, data };
  }
}
