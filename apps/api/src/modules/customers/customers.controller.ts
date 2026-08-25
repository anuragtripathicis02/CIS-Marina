import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { IApiResponse } from '@yacht-platform/types';

@ApiTags('Customer CRM Records')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new customer profile' })
  async createCustomer(
    @CurrentTenant() orgId: string,
    @Body() dto: CreateCustomerDto,
  ): Promise<IApiResponse> {
    const customer = await this.customersService.createCustomer(orgId, dto);
    return {
      success: true,
      data: customer,
      meta: { timestamp: new Date().toISOString(), correlationId: `customer-${customer.id}` },
    };
  }

  @Get()
  @ApiOperation({ summary: 'List customer CRM database' })
  async getCustomers(@CurrentTenant() orgId?: string): Promise<IApiResponse> {
    const customers = await this.customersService.getCustomers(orgId);
    return {
      success: true,
      data: customers,
      meta: { timestamp: new Date().toISOString(), correlationId: `req-${Date.now()}`, totalItems: customers.length },
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed customer profile & booking history' })
  async getCustomerById(@Param('id') id: string): Promise<IApiResponse> {
    const customer = await this.customersService.getCustomerById(id);
    return {
      success: true,
      data: customer,
      meta: { timestamp: new Date().toISOString(), correlationId: `customer-${id}` },
    };
  }
}
