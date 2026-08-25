# STAGE 09 — PHASE 7 ENTERPRISE, COMPLIANCE, MULTI-COUNTRY & ADVANCED ADMINISTRATION SPECIFICATION

## 1. Overview & Multi-Country Architecture
Phase 7 elevates the platform into an international, multi-tenant, multi-currency, multi-language, compliance-aware, auditable, and enterprise-ready SaaS product.

The connected ecosystem flow:

$$\text{MARKETING} \longrightarrow \text{LEADS} \longrightarrow \text{CRM} \longrightarrow \text{CUSTOMERS} \longrightarrow \text{BOOKINGS} \longrightarrow \text{PAYMENTS} \longrightarrow \text{YACHTS} \longrightarrow \text{OPERATIONS} \longrightarrow \text{IOT} \longrightarrow \text{MARINAS} \longrightarrow \text{CUSTOMER PORTAL} \longrightarrow \text{AI} \longrightarrow \text{ENTERPRISE ADMIN} \longrightarrow \text{MULTI-COUNTRY} \longrightarrow \text{COMPLIANCE}$$

---

## 2. Multi-Branch Hierarchy
Hierarchy structure: `Organization` → `Country` → `Region/State` → `Branch` → `Marina` → `Dock` → `Berth`.
Branches inherit organization-level defaults (language, base currency) and support regional overrides (e.g. Monaco Branch - EUR, Dubai Branch - AED, London Branch - GBP).

---

## 3. Configurable Tax Engine (Requirement 10, 73 & Critical Test 2)
Taxes (VAT, GST, Tourism Tax) derive from configurable `TaxRule` records per country & product category (Yacht Charter, Berth Lease, Utility Service, Club Membership). Hard-coded tax logic is strictly forbidden.

$$\text{Total Invoice Amount} = \text{Subtotal} + \left( \text{Subtotal} \times \frac{\text{Configured Tax Rate}}{100} \right)$$

---

## 4. Multi-Currency Precision & Exchange Rate Snapshots (Requirement 6, 72 & Critical Test 1)
All financial transactions store the transaction currency deterministically in `Decimal`/`numeric` fields with snapshot exchange rates (`ExchangeRateProvider`). Display currency conversions are calculated separately for user interfaces without modifying underlying historical records.

---

## 5. Server-Side RBAC & Security (Requirement 22, 75 & Critical Test 4)
Granular permissions (`organization.manage`, `branch.manage`, `booking.manage`, `payment.manage`, `refund.manage`, `audit.view`, `ai.manage`) are enforced server-side via `TenantGuard` and service-level authorization guards. Unauthorized role access is rejected with `403 Forbidden`.

---

## 6. Immutable Audit Trail & Compliance (Requirement 19, 43, 45)
- **Immutable Audit Trail**: Financial modifications, price changes, refunds, and permission edits generate audit log entries (`user`, `action`, `resourceId`, `ipAddress`, `result`, `timestamp`). Normal users cannot alter audit logs.
- **Compliance & GDPR Workflows**: Policy versioning (`v1.0`, `v1.1`), consent history tracking, and data privacy requests (`ACCESS`, `CORRECTION`, `DELETION`, `EXPORT`).
