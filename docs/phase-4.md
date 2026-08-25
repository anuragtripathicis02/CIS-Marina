# STAGE 06 — PHASE 4 MARINA, BERTH & YACHT CLUB MANAGEMENT SPECIFICATION

## 1. Overview & Architecture
Phase 4 extends the platform to support complete Marina Operations, Docks, Berths/Slips, Vessel Reservations, Utility Services, Check-In/Out workflows, and a Yacht Club Management foundation.

The connected architecture extends the platform flow:

$$\text{CUSTOMER} \longrightarrow \text{YACHT / VESSEL} \longrightarrow \text{BOOKING} \longrightarrow \text{MARINA} \longrightarrow \text{DOCK} \longrightarrow \text{BERTH} \longrightarrow \text{RESERVATION} \longrightarrow \text{SERVICES} \longrightarrow \text{PAYMENTS} \longrightarrow \text{YACHT CLUB} \longrightarrow \text{MEMBERSHIP} \longrightarrow \text{EVENTS}$$

---

## 2. Implemented Modules & APIs

### Marina & Berth Management (`/api/v1/marinas`)
- `GET /api/v1/marinas`: List marinas, docks, berths, and capacity specs.
- `POST /api/v1/marinas`: Create new marina profile.
- `POST /api/v1/marinas/:id/docks`: Create dock within marina.
- `POST /api/v1/marinas/docks/:dockId/berths`: Create berth slip with length, beam, draft capacity limits, and utility options.
- `GET /api/v1/marinas/occupancy`: Returns real-time occupancy KPI metrics (`totalBerths`, `occupiedBerths`, `availableBerths`, `reservedBerths`, `maintenanceBerths`, `occupancyRate`, `todaysArrivals`, `todaysDepartures`, `monthlyRevenue`).

### Berth Reservations & Conflict Engine (`/api/v1/berth-reservations`)
- `GET /api/v1/berth-reservations`: List active berth reservations with vessel, customer, and berth specs.
- `POST /api/v1/berth-reservations`: Create reservation with server-side physical capacity check (`maxLengthFt`, `maxBeamFt`, `maxDraftFt`) and backend double-booking overlap guard (`(startA < endB) AND (endA > startB)`).
- `POST /api/v1/berth-reservations/:id/check-in`: Process vessel check-in with condition rating & notes.
- `POST /api/v1/berth-reservations/:id/check-out`: Process vessel check-out.

### Marina Utility Services (`/api/v1/marina-services`)
- `GET /api/v1/marina-services`: List active utility & dockside add-on catalog (Shore Power, Fresh Water, Blackwater Pump-out, Wi-Fi, Washdown, Laundry).

### Marina Contracts (`/api/v1/marina-contracts`)
- `GET /api/v1/marina-contracts`: Short-term, long-term, and seasonal tenant berth lease agreements.

### Yacht Club Foundation (`/api/v1/yacht-club`)
- `GET /api/v1/yacht-club/plans`: Configurable membership tiers (`Gold`, `Silver`, `Family`, `Corporate`).
- `GET /api/v1/yacht-club/members`: Member roster linked to customer identity.
- `GET /api/v1/yacht-club/events`: Exclusive club events & regattas.
- `POST /api/v1/yacht-club/events/:id/register`: Member event registration with capacity limit enforcement.
