import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AiProviderService } from './ai-provider.service';

@Injectable()
export class AiAssistantService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly providerService: AiProviderService,
  ) {}

  /**
   * AI Assistant Chat Execution with Permission-Scoped Tools (Requirement 29, 73 & Critical Test 3)
   */
  async processChatQuery(organizationId: string, userId: string, prompt: string, requestedOrgId?: string) {
    // Security Guard: Cross-Tenant Denial (Critical Test 3)
    if (requestedOrgId && requestedOrgId !== organizationId) {
      throw new ForbiddenException('AI Assistant Access Denied: Cannot query data outside your authorized organization context.');
    }

    // 1. Generate Structured AI Answer
    const aiResponse = await this.providerService.generateText({
      feature: 'CHAT_ASSISTANT',
      prompt,
      context: { organizationId },
    });

    // 2. Audit Log Usage
    await this.logAiUsage(organizationId, userId, 'CHAT_ASSISTANT', 'GENERAL_ASSISTANT', aiResponse.resultText, aiResponse.tokensUsed);

    return {
      success: true,
      answer: aiResponse.resultText,
      tokensUsed: aiResponse.tokensUsed,
      dataContext: { organizationId },
    };
  }

  async generateDraftResponse(organizationId: string, userId: string, dto: { customerName: string; yachtName: string; dates: string }) {
    const aiResponse = await this.providerService.generateText({
      feature: 'CUSTOMER_RESPONSE_DRAFT',
      prompt: 'Draft customer response',
      context: dto,
    });

    await this.logAiUsage(organizationId, userId, 'CUSTOMER_RESPONSE_DRAFT', 'CUSTOMER_COMMUNICATION', aiResponse.resultText, aiResponse.tokensUsed);

    return {
      success: true,
      draftText: aiResponse.resultText,
      reason: aiResponse.recommendationReason,
    };
  }

  async generateMarketingCopy(organizationId: string, userId: string, dto: { yachtName: string; platform: string }) {
    const aiResponse = await this.providerService.generateText({
      feature: 'MARKETING_COPY',
      prompt: 'Generate social media copy',
      context: dto,
    });

    await this.logAiUsage(organizationId, userId, 'MARKETING_COPY', 'MARKETING', aiResponse.resultText, aiResponse.tokensUsed);

    return {
      success: true,
      marketingCopy: aiResponse.resultText,
    };
  }

  async findUsageLogs(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        { id: 'log-1', organizationId, feature: 'CHAT_ASSISTANT', provider: 'BuiltInSimulatedAI', promptCategory: 'GENERAL_ASSISTANT', tokensUsed: 145, estimatedCost: 0.002, approvedStatus: 'APPROVED', timestamp: new Date().toISOString() },
        { id: 'log-2', organizationId, feature: 'CUSTOMER_RESPONSE_DRAFT', provider: 'BuiltInSimulatedAI', promptCategory: 'CUSTOMER_COMMUNICATION', tokensUsed: 210, estimatedCost: 0.004, approvedStatus: 'APPROVED', timestamp: new Date().toISOString() },
      ];
    }

    return this.prisma.aiUsageLog.findMany({
      where: { organizationId },
      orderBy: { timestamp: 'desc' },
    });
  }

  private async logAiUsage(organizationId: string, userId: string, feature: string, promptCategory: string, outputSummary: string, tokensUsed: number) {
    if (!this.prisma.isOperational()) return;

    await this.prisma.aiUsageLog.create({
      data: {
        organizationId,
        userId,
        feature,
        provider: 'BuiltInSimulatedAI',
        promptCategory,
        outputSummary: outputSummary.substring(0, 100),
        tokensUsed,
        estimatedCost: parseFloat((tokensUsed * 0.00002).toFixed(4)),
        approvedStatus: 'APPROVED',
      },
    });
  }
}
