import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { YachtsService } from './yachts.service';
import { CreateYachtDto } from './dto/create-yacht.dto';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('Yacht Fleet Inventory')
@Controller('yachts')
export class YachtsController {
  constructor(private readonly yachtsService: YachtsService) {}

  @Post()
  @ApiOperation({ summary: 'Register new yacht in organization fleet' })
  async createYacht(
    @CurrentTenant() orgId: string,
    @Body() dto: CreateYachtDto,
  ): Promise<IApiResponse> {
    const yacht = await this.yachtsService.createYacht(orgId, dto);
    return {
      success: true,
      data: yacht,
      meta: { timestamp: new Date().toISOString(), correlationId: `yacht-${yacht.id}` },
    };
  }

  @Get()
  @ApiOperation({ summary: 'List fleet yachts' })
  async getYachts(@CurrentTenant() orgId?: string): Promise<IApiResponse> {
    const yachts = await this.yachtsService.getYachts(orgId);
    return {
      success: true,
      data: yachts,
      meta: { timestamp: new Date().toISOString(), correlationId: `req-${Date.now()}`, totalItems: yachts.length },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get yacht details & photo gallery' })
  async getYachtById(
    @Param('id') id: string,
    @CurrentTenant() orgId?: string,
  ): Promise<IApiResponse> {
    const yacht = await this.yachtsService.getYachtById(id, orgId);
    return {
      success: true,
      data: yacht,
      meta: { timestamp: new Date().toISOString(), correlationId: `yacht-${id}` },
    };
  }
}
