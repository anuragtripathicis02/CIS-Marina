# Phase 1 Digital Booking SaaS MVP — Implementation Specification

## 1. Overview & Delivered Scope

**Phase 1 — Digital Booking SaaS MVP** delivers a commercially usable B2B SaaS platform for yacht charter operators, fleet managers, and marina businesses.

### Delivered Modules
1. **Authentication & Multi-Tenant Security**: JWT Auth, bcrypt password hashing, `TenantGuard`, Node `AsyncLocalStorage`, and PostgreSQL Row Level Security (RLS) (`app.current_organization_id`).
2. **Organization Onboarding Wizard**: Multi-step onboarding (`/auth/onboarding`) configuring organization profile, business sector, base currency (USD/EUR/AED/GBP/INR), and primary operational timezone.
3. **Yacht Fleet Inventory**: Full CRUD APIs for registering yachts, technical specifications (LOA, capacity, cabins), photo gallery links, and base hourly/daily rates.
4. **Yacht Availability Timeline**: Multi-yacht visual calendar tracking vessel status (`AVAILABLE`, `RESERVED`, `BOOKED`, `BLOCKED`, `MAINTENANCE`).
5. **Double-Booking Protection**: Double-booking exclusion engine preventing overlapping charter reservations via PostgreSQL `btree_gist` constraints and pessimistic transaction locks.
6. **Customer CRM**: Guest database records, contact details, VIP badges, and lifetime spend history.
7. **Booking Engine State Machine**: Controlled status transitions: `INQUIRY` → `QUOTE` → `PENDING` → `RESERVED` → `DEPOSIT_PAID` → `CONFIRMED` → `CONTRACT_SIGNED` → `READY` → `IN_PROGRESS` → `COMPLETED` / `CANCELLED`.
8. **Experience Add-On Customizer**: Luxury guest experience package builder (Gourmet Catering, DJs, Watersports, Floral decor) calculating real-time totals using `NUMERIC(14,2)` precision.
9. **Stripe Payment Engine & Invoicing**: Payment intent capture for deposits, automatic invoice generation (`ISSUED`, `PAID`), and receipt tracking.
10. **Administrative SaaS Dashboard**: Real-time KPI metrics (`Total Revenue`, `Upcoming Charters`, `Active Bookings`, `Fleet Utilization`).
11. **Customer Charter Booking Journey**: Public luxury discovery (`/charter`), yacht detail page (`/charter/[id]`), checkout (`/charter/checkout/[id]`), and confirmation page (`/charter/confirmation/[id]`).

---

## 2. API Endpoints Map

| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/signup` | User signup & account creation | Public |
| `POST` | `/api/v1/auth/login` | Authenticate user credentials & return JWT | Public |
| `POST` | `/api/v1/organizations/onboard` | Onboard organization workspace | Bearer |
| `GET`  | `/api/v1/organizations/:id` | Get organization details | Bearer |
| `POST` | `/api/v1/yachts` | Register new yacht in fleet | Bearer |
| `GET`  | `/api/v1/yachts` | List fleet yachts | Bearer |
| `GET`  | `/api/v1/yachts/:id` | Get yacht details & photos | Bearer |
| `POST` | `/api/v1/customers` | Create customer CRM profile | Bearer |
| `GET`  | `/api/v1/customers` | List customer CRM records | Bearer |
| `POST` | `/api/v1/bookings` | Create reservation with exclusion lock check | Bearer |
| `GET`  | `/api/v1/bookings` | List bookings with optional status filter | Bearer |
| `PATCH`| `/api/v1/bookings/:id/status` | Transition booking status (State Machine) | Bearer |
| `POST` | `/api/v1/payments/intent` | Create & capture Stripe payment intent | Bearer |
| `GET`  | `/api/v1/payments` | List financial transaction ledgers | Bearer |
| `GET`  | `/api/v1/dashboard/metrics` | Executive SaaS KPI dashboard metrics | Bearer |
