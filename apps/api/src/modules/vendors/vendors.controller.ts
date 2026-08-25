import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('vendors')
@UseGuards(TenantGuard)
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.vendorsService.findAll(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.vendorsService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }
}
