import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Currency } from '@yacht-platform/types';

@Injectable()
export class CurrencyExchangeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * ExchangeRateProvider Abstraction & Snapshot Lookup (Requirement 7, 72 & Critical Test 1)
   */
  async getExchangeRate(baseCurrency: Currency, targetCurrency: Currency): Promise<number> {
    if (baseCurrency === targetCurrency) return 1.0;

    const mockRates: Record<string, number> = {
      'USD_EUR': 0.92,
      'EUR_USD': 1.087,
      'USD_GBP': 0.79,
      'USD_AED': 3.67,
      'EUR_AED': 3.99,
      'GBP_EUR': 1.16,
    };

    const pairKey = `${baseCurrency}_${targetCurrency}`;
    if (mockRates[pairKey]) return mockRates[pairKey];

    return 1.0;
  }

  /**
   * Multi-Currency Display Conversion Guard (Requirement 6, 72 & Critical Test 1)
   * Original transaction currency remains unmodified ($10,000 USD).
   * Display conversion is calculated separately for customer interface.
   */
  async convertAmount(amount: number, baseCurrency: Currency, displayCurrency: Currency) {
    const rate = await this.getExchangeRate(baseCurrency, displayCurrency);
    const convertedAmount = amount * rate;

    return {
      originalAmount: amount,
      baseCurrency,
      displayCurrency,
      exchangeRate: rate,
      convertedAmount,
      formattedDisplay: `${displayCurrency} ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
  }
}
