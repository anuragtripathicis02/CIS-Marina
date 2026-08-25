# COUNTRY CONFIGURATION MATRIX & REGIONAL STATUS

## 1. Regional Configuration Matrix

| Country Name | Code | Default Currency | Timezone | Date Format | Tax Model | Payment Provider | Implementation Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Monaco** | `MC` | `EUR` | `Europe/Monaco` | `DD/MM/YYYY` | VAT (20%) | Stripe EUR | `READY` |
| **United Arab Emirates** | `AE` | `AED` | `Asia/Dubai` | `DD/MM/YYYY` | VAT (5%) | Stripe AED / Bank Wire | `READY` |
| **United Kingdom** | `GB` | `GBP` | `Europe/London` | `DD/MM/YYYY` | VAT (20%) | Stripe GBP | `READY` |
| **United States** | `US` | `USD` | `America/New_York` | `MM/DD/YYYY` | State Sales Tax | Stripe USD | `READY` |
| **France** | `FR` | `EUR` | `Europe/Paris` | `DD/MM/YYYY` | VAT (20%) | Stripe EUR | `READY` |
| **Spain** | `ES` | `EUR` | `Europe/Madrid` | `DD/MM/YYYY` | IVA (21%) | Stripe EUR | `READY` |
| **Italy** | `IT` | `EUR` | `Europe/Rome` | `DD/MM/YYYY` | IVA (22%) | Stripe EUR | `READY` |
| **Greece** | `GR` | `EUR` | `Europe/Athens` | `DD/MM/YYYY` | VAT (24%) | Stripe EUR | `READY` |
| **Croatia** | `HR` | `EUR` | `Europe/Zagreb` | `DD/MM/YYYY` | PDV (25%) | Stripe EUR | `READY` |
| **Singapore** | `SG` | `SGD` | `Asia/Singapore` | `DD/MM/YYYY` | GST (9%) | Stripe SGD | `READY` |
| **Australia** | `AU` | `AUD` | `Australia/Sydney` | `DD/MM/YYYY` | GST (10%) | Stripe AUD | `READY` |
| **Caribbean (BVI/Bahamas)** | `BS` | `USD` | `America/Nassau` | `MM/DD/YYYY` | Tourism Tax (10%) | Stripe USD | `READY` |

---

## 2. Compliance Disclaimer
The platform provides configurable tax rules (`TaxRule`) and country settings (`CountryConfig`). Local legal, tax filing, and maritime licensing reviews should be conducted by regional operators (`LEGAL REVIEW RECOMMENDED`).
