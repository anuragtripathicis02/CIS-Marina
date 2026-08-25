# Phase 1 Screen Inventory & UX Map — Smart Yacht & Marina Management Platform

## 1. Marketing Website (Public Facing)

| Screen ID | Screen Name | Route / Path | Priority | Core Purpose & Components |
| :--- | :--- | :--- | :---: | :--- |
| `MKT-01` | Homepage | `/` | **P1** | Hero section, value proposition, featured yachts, platform solutions teaser, CTA to book demo or discover fleet. |
| `MKT-02` | Yacht Discovery | `/charter` | **P1** | Search bar with location, date range, passenger filters, interactive yacht cards with specs & hourly/daily rates. |
| `MKT-03` | Yacht Detail Page | `/charter/[slug]` | **P1** | Photo gallery, specs grid, amenity icons, pricing breakdown, real-time availability calendar, booking request form. |
| `MKT-04` | Solutions / Platform | `/solutions` | **P2** | Overview of SaaS platform capabilities for yacht operators and marina owners. |
| `MKT-05` | Book a Demo | `/demo` | **P1** | Lead capture form for enterprise operators requesting a platform demonstration. |

---

## 2. Authentication & Tenant Onboarding

| Screen ID | Screen Name | Route / Path | Priority | Core Purpose & Components |
| :--- | :--- | :--- | :---: | :--- |
| `AUTH-01`| Login | `/auth/login` | **P1** | Email/password login, remember me, link to forgot password, redirect to appropriate role portal. |
| `AUTH-02`| Signup / Onboarding | `/auth/register` | **P1** | Multi-step form: Account registration -> Organization name & country -> Currency & timezone settings. |
| `AUTH-03`| Forgot Password | `/auth/forgot-password`| **P1** | Password recovery request input. |
| `AUTH-04`| Reset Password | `/auth/reset-password` | **P1** | Secure password reset completion screen. |

---

## 3. Customer Self-Service Portal

| Screen ID | Screen Name | Route / Path | Priority | Core Purpose & Components |
| :--- | :--- | :--- | :---: | :--- |
| `CUST-01`| Booking Checkout | `/checkout/[id]` | **P1** | Guest details form, charter add-ons selection, breakdown of subtotal/taxes/deposit, Stripe card element checkout. |
| `CUST-02`| Booking Confirmation| `/booking/confirmed` | **P1** | Confirmation summary, booking reference #, PDF invoice download link, next steps checklist. |
| `CUST-03`| Customer Dashboard | `/portal/bookings` | **P1** | List of upcoming and past charters, current status badges, action buttons (pay balance, download contract). |
| `CUST-04`| Booking Details | `/portal/bookings/[id]`| **P1** | Complete charter itinerary, captain contact info, weather forecast, balance payment widget. |

---

## 4. Administrative & Operator Dashboard

| Screen ID | Screen Name | Route / Path | Priority | Core Purpose & Components |
| :--- | :--- | :--- | :---: | :--- |
| `ADM-01` | Executive Dashboard | `/admin` | **P1** | Key KPIs (Active Bookings, Revenue, Fleet Utilization %), quick action shortcuts, recent booking activity feed. |
| `ADM-02` | Fleet Management | `/admin/yachts` | **P1** | Grid/table of organization vessels, active/maintenance status badges, quick edit drawer, add yacht button. |
| `ADM-03` | Yacht Detail & Rates | `/admin/yachts/[id]` | **P1** | Manage vessel technical specs, upload high-res photo gallery, configure seasonal & hourly pricing rules. |
| `ADM-04` | Availability Calendar | `/admin/calendar` | **P1** | Visual multi-yacht timeline calendar showing reservations, inquiries, and blocked maintenance dates. |
| `ADM-05` | Booking List | `/admin/bookings` | **P1** | Tabbed list of bookings (`Inquiry`, `Quote`, `Confirmed`, `In-Progress`, `Completed`, `Cancelled`) with search & filters. |
| `ADM-06` | Booking Operations | `/admin/bookings/[id]` | **P1** | Full booking details, customer info, status transition controls (`Send Quote`, `Confirm`, `Cancel`), invoice status. |
| `ADM-07` | Customer CRM | `/admin/customers` | **P1** | Customer database table with contact details, lifetime spend, booking count, VIP tag, and notes drawer. |
| `ADM-08` | Financials & Invoices | `/admin/financials` | **P1** | Revenue summaries, payment log table, status of deposit vs final balance, refund execution dialog. |
| `ADM-09` | Organization Settings| `/admin/settings` | **P1** | Organization profile, currency/timezone configurations, team member invite & RBAC role assignment list. |
| `ADM-10` | Audit Logs | `/admin/audit-logs` | **P2** | Immutable audit trail viewer with filter by actor, action, and date range. |
