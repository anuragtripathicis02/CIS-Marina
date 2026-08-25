# TECHNICAL DEBT & KNOWN RISKS REPORT

## 1. Classified Technical Debt

### Critical Severity (`0 Issues`)
- No blocking critical technical debt exists.

### High Severity (`0 Issues`)
- All high-severity items (such as missing rate-limiting and open CORS in local dev) have been remediated in Phase 11.

### Medium Severity (`2 Items`)
1. **Fallback Mock Data Mode in Offline Database Environments**:
   - *Description*: When Prisma database connection is unavailable (e.g. initial dev setup without local Postgres running), services fallback to structured in-memory mock datasets.
   - *Remediation*: In production, `NODE_ENV=production` enforces hard database connectivity and disables mock fallbacks.
2. **Third-Party Exchange Rate Live Provider**:
   - *Description*: `CurrencyExchangeService` uses configurable mock exchange rates for AED/EUR/USD when third-party provider API keys are not supplied.
   - *Remediation*: Plug OpenExchangeRates or Fixer.io API key into `ExchangeRateProvider` for real-time live forex streaming.

### Low Severity (`1 Item`)
1. **Local CSV Sync Export Batch Size**:
   - *Description*: Large report exports are currently generated synchronously for smaller datasets (<10,000 rows).
   - *Remediation*: As dataset volume grows beyond 50,000 rows, transition CSV exports to async background S3 download links.
