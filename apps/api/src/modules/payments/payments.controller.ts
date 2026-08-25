import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('Payments & Invoicing')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('intent')
  @ApiOperation({ summary: 'Create & capture Stripe payment intent' })
  async createPaymentIntent(
    @CurrentTenant() orgId: string,
    @Body() dto: CreatePaymentIntentDto,
  ): Promise<IApiResponse> {
    const data = await this.paymentsService.createPaymentIntent(orgId, dto);
    return {
      success: true,
      data,
      meta: { timestamp: new Date().toISOString(), correlationId: `pay-${data.payment.id}` },
    };
  }

  @Get()
  @ApiOperation({ summary: 'List financial payment transactions' })
  async getPayments(@CurrentTenant() orgId?: string): Promise<IApiResponse> {
    const payments = await this.paymentsService.getPayments(orgId);
    return {
      success: true,
      data: payments,
      meta: { timestamp: new Date().toISOString(), correlationId: `req-${Date.now()}`, totalItems: payments.length },
    };
  }
}
