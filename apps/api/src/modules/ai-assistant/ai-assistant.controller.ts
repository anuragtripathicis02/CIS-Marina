import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';

@Controller('ai')
@UseGuards(TenantGuard)
export class AiAssistantController {
  constructor(private readonly aiService: AiAssistantService) {}

  @Post('chat')
  async chatQuery(
    @CurrentTenant() organizationId: string,
    @Body() dto: { prompt: string; requestedOrgId?: string },
  ) {
    const data = await this.aiService.processChatQuery(organizationId || 'org-1', 'user-1', dto.prompt, dto.requestedOrgId);
    return { success: true, data };
  }

  @Post('draft-response')
  async draftResponse(
    @CurrentTenant() organizationId: string,
    @Body() dto: { customerName: string; yachtName: string; dates: string },
  ) {
    const data = await this.aiService.generateDraftResponse(organizationId || 'org-1', 'user-1', dto);
    return { success: true, data };
  }

  @Post('generate-copy')
  async generateCopy(
    @CurrentTenant() organizationId: string,
    @Body() dto: { yachtName: string; platform: string },
  ) {
    const data = await this.aiService.generateMarketingCopy(organizationId || 'org-1', 'user-1', dto);
    return { success: true, data };
  }

  @Get('usage-logs')
  async getUsageLogs(@CurrentTenant() organizationId: string) {
    const data = await this.aiService.findUsageLogs(organizationId || 'org-1');
    return { success: true, data };
  }
}
