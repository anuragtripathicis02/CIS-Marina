import { Controller, Get, Post, Body, Query, UseGuards, Param } from '@nestjs/common';
import { MarinaService } from './marina.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('marinas')
@UseGuards(TenantGuard)
export class MarinaController {
  constructor(private readonly marinaService: MarinaService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.marinaService.findAllMarinas(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.marinaService.createMarina(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Post(':id/docks')
  async createDock(@Param('id') marinaId: string, @Body() dto: any) {
    const data = await this.marinaService.createDock(marinaId, dto);
    return { success: true, data };
  }

  @Post('docks/:dockId/berths')
  async createBerth(@Param('dockId') dockId: string, @Body() dto: any) {
    const data = await this.marinaService.createBerth(dockId, dto);
    return { success: true, data };
  }

  @Get('occupancy')
  async getOccupancy(@CurrentTenant() organizationId: string, @Query('marinaId') marinaId?: string) {
    const data = await this.marinaService.getOccupancyMetrics(organizationId || 'org-1', marinaId);
    return { success: true, data };
  }
}
