import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { IApiResponse, ILead } from '@yacht-platform/types';

@ApiTags('Leads & Sales Inquiries')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Submit a new public demo request / lead inquiry' })
  @ApiResponse({ status: 201, description: 'Lead successfully captured' })
  async createLead(@Body() dto: CreateLeadDto): Promise<IApiResponse<ILead>> {
    const lead = await this.leadsService.createLead(dto);
    return {
      success: true,
      data: lead,
      meta: {
        timestamp: new Date().toISOString(),
        correlationId: `lead-${lead.id.substring(0, 8)}`,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'List captured sales leads (Internal Sales Dashboard API)' })
  async getAllLeads(): Promise<IApiResponse<ILead[]>> {
    const leads = await this.leadsService.getAllLeads();
    return {
      success: true,
      data: leads,
      meta: {
        timestamp: new Date().toISOString(),
        correlationId: `req-${Date.now()}`,
        totalItems: leads.length,
      },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get specific sales lead details' })
  async getLeadById(@Param('id') id: string): Promise<IApiResponse<ILead | null>> {
    const lead = await this.leadsService.getLeadById(id);
    return {
      success: true,
      data: lead,
      meta: {
        timestamp: new Date().toISOString(),
        correlationId: `req-${Date.now()}`,
      },
    };
  }
}
