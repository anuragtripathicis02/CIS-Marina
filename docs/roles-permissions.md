# Roles & Granular Permission Matrix — Smart Yacht & Marina Management Platform

## 1. System Roles Inventory

The platform defines **13 distinct user roles** to accommodate complex enterprise organizational hierarchies:

| Role Code | Role Name | Scope | Description |
| :--- | :--- | :--- | :--- |
| `SUPER_ADMIN` | Platform Super Admin | Global | Full control over system infrastructure, tenant management, and platform billing. |
| `ORG_ADMIN` | Organization Admin | Tenant | Complete administrative authority over a specific organization/tenant. |
| `OPS_MANAGER` | Operations Manager | Tenant | Oversees daily charters, vessel availability, crew rosters, and incident reports. |
| `BOOKING_MANAGER` | Booking Manager | Tenant | Manages inquiries, quotes, reservations, charter contracts, and customer CRM. |
| `FLEET_MANAGER` | Fleet Manager | Tenant | Manages vessel inventory, technical specifications, documents, and maintenance. |
| `FINANCE_MANAGER` | Finance Manager | Tenant | Handles invoices, payment processing, refunds, tax reporting, and financial analytics. |
| `CUSTOMER_SUPPORT`| Customer Support | Tenant | Resolves customer inquiries, updates booking notes, assists during charter execution. |
| `CONCIERGE` | Concierge & Events | Tenant | Manages luxury event requests, catering, entertainment, and custom add-ons. |
| `CREW` | Deck / Interior Crew | Vessel | Views assigned charter schedules, safety checklists, and guest preferences. |
| `CAPTAIN` | Vessel Captain | Vessel | Manages vessel logbook, pre-charter checklists, vessel safety, and navigation. |
| `MARINA_MANAGER` | Marina Manager | Marina | Manages slip allocations, dock reservations, utility meters, and marina facilities. |
| `CUSTOMER` | Charter Guest | End-User| Discovers yachts, creates bookings, signs digital contracts, and views invoices. |
| `YACHT_OWNER` | Yacht Owner | Vessel | Views owner booking calendar, charter revenue reports, and vessel statements. |

---

## 2. Phase 1 Granular Permission Matrix

Permissions follow the format `domain.action` (e.g. `bookings.create`, `yachts.update`).

| Permission Code | Description | Super Admin | Org Admin | Booking Mgr | Fleet Mgr | Finance Mgr | Customer |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| `org.view` | View organization profile | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `org.update` | Update organization settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `users.manage` | Manage org staff & roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `yachts.view` | View fleet inventory | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (Public) |
| `yachts.create` | Add new yacht to fleet | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `yachts.update` | Update rates & specifications | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| `yachts.delete` | Delete/archive yacht | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| `availability.manage`| Set blackout & block dates | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| `bookings.view_all` | View all organization bookings| ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| `bookings.view_own` | View own customer bookings | N/A | N/A | N/A | N/A | N/A | ✅ |
| `bookings.create` | Create booking inquiry | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ |
| `bookings.quote` | Issue formal price quote | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `bookings.confirm` | Confirm reservation | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `bookings.cancel` | Cancel booking reservation | ✅ | ✅ | ✅ | ❌ | ❌ | ✅ (Own) |
| `customers.view` | Access customer CRM | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `customers.manage` | Update customer profiles | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| `payments.view` | View financial records | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| `payments.manage` | Process refunds/adjustments | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ |
| `audit.view` | Access audit logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
