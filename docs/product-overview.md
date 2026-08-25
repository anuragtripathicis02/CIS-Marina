# Product Overview — Smart Yacht & Marina Management Platform

## 1. Product Vision

The **Smart Yacht & Marina Management Platform** is a long-term, production-ready B2B SaaS ecosystem built specifically for the global yachting, charter, fleet management, and marina management industries.

Rather than acting merely as a public yacht-booking website, the platform serves as an integrated **Operating System for Yacht & Marina Businesses**. It bridges disconnected operational processes into a single unified digital ecosystem:

```
[ BOOKING ] + [ CUSTOMER EXPERIENCE ] + [ OPERATIONS ] + [ FLEET ] 
            + [ CREW ] + [ MARINA ] + [ PAYMENTS ] + [ IOT ] + [ CONCIERGE ] + [ AI ]
```

---

## 2. Core Target Markets & Internationalization Requirements

The platform is architected from day one for seamless international deployment across key markets:

- **Primary Regions**: India, United States, Canada, United Kingdom, United Arab Emirates (UAE), European Union, Australia, Japan, Singapore.

### Internationalization Architecture Guarantees
1. **Multi-Currency Engine**: All monetary values are decoupled from single currencies, storing ISO 4217 currency codes (`USD`, `EUR`, `AED`, `GBP`, `INR`, `AUD`, `SGD`, `JPY`) alongside precise `NUMERIC(14,2)` amounts.
2. **Multi-Timezone Engine**: All database timestamps are strictly stored in Coordinated Universal Time (`UTC`). Frontends render times formatted to local browser/organization timezones.
3. **Locale & Formatting**: Date, time, and number formatting adapt dynamically based on user locale standard (`en-US`, `en-GB`, `en-IN`, `ar-AE`, `ja-JP`, etc.).
4. **Configurable Tax Systems**: Dynamic tax engine handling VAT, GST, Sales Tax, and Luxury surcharges based on organization location and vessel operating jurisdiction.
5. **Localization (i18n)**: Fully decoupled translation keys across marketing web, admin console, and customer portal.

---

## 3. Product Development Philosophy & Roadmap Strategy

We follow the principle:
**BUILD THE FOUNDATION FIRST. BUILD THE MVP SECOND. EXPAND THE PLATFORM GRADUALLY.**

Every platform capability is classified into one of the following development stages:

| Phase | Title | Focus & Scope |
| :--- | :--- | :--- |
| **Phase 0** | **Foundation & Architecture** *(Current)* | Monorepo structure, PostgreSQL schema, RLS multi-tenant security, NestJS + Next.js architecture, RBAC matrix, Design tokens, API Blueprint. |
| **Phase 1** | **Digital Booking MVP** | Marketing website, Auth, Org Onboarding, Yacht Listings, Dynamic Pricing, Booking Engine (State Machine), Stripe Payments, Digital Contracts, Customer CRM, Admin Dashboard. |
| **Phase 2** | **Operations & Crew** | Fleet management, Crew scheduling & certifications, Pre-charter checklists, Maintenance logs, Vendor management, Concierge request workflow. |
| **Phase 3** | **Smart Operations & IoT** | Vessel telemetry (TimescaleDB), GPS tracking, Geofencing, Real-time engine/battery/bilge/fuel sensor alerts, Advanced operational analytics. |
| **Phase 4** | **Complete Ecosystem** | VIP Mobile App, Marina Slip Management, Yacht Club Management, AI Concierge & Smart Dispatch, Owner Portal, White-Label Customer Experience. |

---

## 4. Multi-Tenant Business Architecture

The system operates on an **Organization-centric Multi-tenant Architecture**:

- **Tenant = Organization** (e.g., Charter Operator, Fleet Owner, Marina Manager).
- Data isolation is guaranteed at the database layer via PostgreSQL **Row Level Security (RLS)** and enforced application-wide via NestJS tenant middleware and context guards.
- Enterprise tenants may seamlessly transition to isolated dedicated databases in future phases without schema or application code refactoring.
