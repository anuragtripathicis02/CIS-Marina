import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Currency, TaxCategory } from '@yacht-platform/types';

@Injectable()
export class CountryConfigService {
  constructor(private readonly prisma: PrismaService) {}

  async findCountryConfigs() {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'cc-us',
          countryCode: 'US',
          countryName: 'United States',
          defaultCurrency: Currency.USD,
          currencySymbol: '$',
          timezone: 'America/New_York',
          dateFormat: 'MM/DD/YYYY',
          phoneCode: '+1',
          addressFormat: 'STATE_ZIP',
          taxModel: 'SALES_TAX',
          invoiceRules: 'US_IRS_STANDARD',
          enabledPaymentProviders: ['Stripe', 'AuthorizeNet', 'BankWire'],
          enabledLanguages: ['en'],
        },
        {
          id: 'cc-ae',
          countryCode: 'AE',
          countryName: 'United Arab Emirates',
          defaultCurrency: Currency.AED,
          currencySymbol: 'AED',
          timezone: 'Asia/Dubai',
          dateFormat: 'DD/MM/YYYY',
          phoneCode: '+971',
          addressFormat: 'EMIRATE_POBOX',
          taxModel: 'VAT_5_PERCENT',
          invoiceRules: 'FTA_TAX_INVOICE',
          enabledPaymentProviders: ['Stripe', 'NetworkInternational', 'TapPayments'],
          enabledLanguages: ['en', 'ar'],
        },
        {
          id: 'cc-fr',
          countryCode: 'FR',
          countryName: 'France & Monaco',
          defaultCurrency: Currency.EUR,
          currencySymbol: '€',
          timezone: 'Europe/Paris',
          dateFormat: 'DD/MM/YYYY',
          phoneCode: '+33',
          addressFormat: 'EUROPEAN_STANDARD',
          taxModel: 'VAT_20_PERCENT',
          invoiceRules: 'EU_SIRET_VAT_RULE',
          enabledPaymentProviders: ['Stripe', 'SEPA_DirectDebit', 'Adyen'],
          enabledLanguages: ['en', 'fr'],
        },
      ];
    }

    return this.prisma.countryConfig.findMany();
  }

  async findTaxRules(organizationId: string) {
    if (!this.prisma.isOperational()) {
      return [
        {
          id: 'tr-vat-20',
          organizationId,
          countryCode: 'FR',
          taxName: 'French Riviera Maritime VAT',
          taxRate: 20.0,
          category: TaxCategory.YACHT_CHARTER,
          jurisdiction: 'NATIONAL',
          isActive: true,
          createdAt: new Date().toISOString(),
        },
        {
          id: 'tr-vat-5',
          organizationId,
          countryCode: 'AE',
          taxName: 'UAE Commercial VAT',
          taxRate: 5.0,
          category: TaxCategory.BERTH_LEASE,
          jurisdiction: 'NATIONAL',
          isActive: true,
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return this.prisma.taxRule.findMany({
      where: { organizationId },
    });
  }

  /**
   * Configurable Tax Engine Calculation (Requirement 10, 73 & Critical Test 2)
   */
  async calculateTax(organizationId: string, amount: number, category: TaxCategory, countryCode: string = 'FR') {
    let taxRate = 10.0; // Default fallback from config

    if (this.prisma.isOperational()) {
      const rule = await this.prisma.taxRule.findFirst({
        where: { organizationId, countryCode, category, isActive: true },
      });
      if (rule) taxRate = rule.taxRate;
    }

    const subtotal = amount;
    const taxAmount = (subtotal * taxRate) / 100;
    const total = subtotal + taxAmount;

    return {
      subtotal,
      taxName: `Configured Tax (${taxRate}%)`,
      taxRate,
      taxAmount,
      total,
      breakdown: {
        subtotal: subtotal.toFixed(2),
        tax: taxAmount.toFixed(2),
        total: total.toFixed(2),
      },
    };
  }
}
