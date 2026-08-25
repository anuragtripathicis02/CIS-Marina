# STAGE 08 — PHASE 6 CUSTOMER PORTAL, MOBILE EXPERIENCE & CONCIERGE SPECIFICATION

## 1. Overview & Architecture
Phase 6 introduces the customer-facing digital experience (`/portal`), enabling customers to discover yachts, search real-time availability, manage bookings, process payments, request dockside add-on services, order bespoke concierge experiences, join yacht club events with waitlists, submit support tickets, and interact with a customer-safe AI assistant.

The connected architecture extends the platform flow:

$$\text{WEBSITE} \longrightarrow \text{SEARCH} \longrightarrow \text{LEAD} \longrightarrow \text{CUSTOMER PORTAL} \longrightarrow \text{BOOKING} \longrightarrow \text{PAYMENT} \longrightarrow \text{MARINA / BERTH} \longrightarrow \text{SERVICES} \longrightarrow \text{CONCIERGE} \longrightarrow \text{MEMBERSHIP / EVENTS} \longrightarrow \text{SUPPORT \& FEEDBACK}$$

---

## 2. Implemented Modules & APIs

### Customer Portal (`/api/v1/portal`)
- `GET /api/v1/portal/summary`: Customer Dashboard overview metrics & upcoming booking.
- `GET /api/v1/portal/bookings/:id`: Booking detail with server-side resource ownership guard (`booking.customerId === authenticatedCustomerId`).
- `POST /api/v1/portal/bookings/revalidate-checkout`: Inventory availability revalidation before payment capture.
- `POST /api/v1/portal/ai-chat`: Customer-scoped AI assistant ("What time is my check-in?").
- `GET /api/v1/portal/concierge`: Active concierge requests.
- `POST /api/v1/portal/concierge`: Submit bespoke concierge request.
- `POST /api/v1/portal/services/request`: Request add-on service with operator review status guard.
- `GET /api/v1/portal/support`: Customer support tickets.
- `POST /api/v1/portal/events/:id/register`: Event registration with capacity waitlist engine.
