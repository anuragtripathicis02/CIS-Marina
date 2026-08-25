import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { BranchesService } from './branches.service';
import { CountryConfigService } from './country-config.service';
import { CurrencyExchangeService } from './currency-exchange.service';
import { SubscriptionsService } from './subscriptions.service';
import { ComplianceService } from './compliance.service';
import { SystemHealthService } from './system-health.service';
import { TenantGuard } from '../../common/guards/tenant.guard';
import { CurrentTenant } from '../../common/decorators/current-tenant.decorator';
import { Currency, TaxCategory } from '@yacht-platform/types';

@Controller('enterprise')
@UseGuards(TenantGuard)
export class EnterpriseController {
  constructor(
    private readonly branchesService: BranchesService,
    private readonly countryService: CountryConfigService,
    private readonly currencyService: CurrencyExchangeService,
    private readonly subscriptionsService: SubscriptionsService,
    private readonly complianceService: ComplianceService,
    private readonly healthService: SystemHealthService,
  ) {}

  @Get('summary')
  async getSummary() {
    return {
      success: true,
      data: {
        totalOrganizations: 18,
        activeSubscriptions: 16,
        activeBranchesCount: 42,
        supportedCountriesCount: 14,
        systemHealth: 'HEALTHY',
        storageUsedGb: 14.2,
      },
    };
  }

  @Get('branches')
  async getBranches(@CurrentTenant() organizationId: string) {
    const data = await this.branchesService.findBranches(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('branches')
  async createBranch(@CurrentTenant() organizationId: string, @Body() dto: any) {
    const data = await this.branchesService.createBranch(organizationId || 'org-1', dto);
    return { success: true, data };
  }

  @Get('countries')
  async getCountries() {
    const data = await this.countryService.findCountryConfigs();
    return { success: true, data };
  }

  @Get('tax-rules')
  async getTaxRules(@CurrentTenant() organizationId: string) {
    const data = await this.countryService.findTaxRules(organizationId || 'org-1');
    return { success: true, data };
  }

  @Post('tax-rules/calculate')
  async calculateTax(
    @CurrentTenant() organizationId: string,
    @Body() dto: { amount: number; category: TaxCategory; countryCode?: string },
  ) {
    const data = await this.countryService.calculateTax(organizationId || 'org-1', dto.amount, dto.category, dto.countryCode);
    return { success: true, data };
  }

  @Get('currencies/convert')
  async convertCurrency(
    @Query('amount') amountStr: string,
    @Query('base') base: Currency,
    @Query('target') target: Currency,
  ) {
    const amount = parseFloat(amountStr || '10000');
    const data = await this.currencyService.convertAmount(amount, base || Currency.USD, target || Currency.EUR);
    return { success: true, data };
  }

  @Get('subscription')
  async getSubscription(@CurrentTenant() organizationId: string) {
    const data = await this.subscriptionsService.getSubscription(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('feature-flags')
  async getFeatureFlags(@CurrentTenant() organizationId: string) {
    const data = await this.subscriptionsService.getFeatureFlags(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('audit-logs')
  async getAuditLogs(@CurrentTenant() organizationId: string, @Query('q') query?: string) {
    const data = await this.complianceService.searchAuditLogs(organizationId || 'org-1', query);
    return { success: true, data };
  }

  @Get('privacy-requests')
  async getPrivacyRequests(@CurrentTenant() organizationId: string) {
    const data = await this.complianceService.findPrivacyRequests(organizationId || 'org-1');
    return { success: true, data };
  }

  @Get('health')
  async getSystemHealth() {
    const data = await this.healthService.getHealthStatus();
    return { success: true, data };
  }
}
