import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MarinaContractsService } from './marina-contracts.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('marina-contracts')
@UseGuards(TenantGuard)
export class MarinaContractsController {
  constructor(private readonly contractsService: MarinaContractsService) {}

  @Get()
  async findAll(@CurrentTenant() organizationId: string) {
    const data = await this.contractsService.findAll(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post()
  async create(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.contractsService.create(organizationId || 'org-1', dto);
    return { success: true, data };
  }
}
