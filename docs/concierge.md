# SERVICES MARKETPLACE, CONCIERGE & EVENT WAITLISTS SPECIFICATION

## 1. Add-On Services Review Guard (Critical Test 5)
Add-on service requests (Private Chef, Water Toys, Helicopter Transfers) enter `REQUESTED` status and route directly into the Admin Operations Console for operator review & confirmation (`REQUESTED` → `UNDER_REVIEW` → `CONFIRMED`).

---

## 2. Event Capacity & Waitlist Engine (Critical Test 6)
When a Yacht Club event reaches maximum capacity (`capacity: 100`), additional customer registration requests generate an `EventWaitlist` record (`JOIN WAITLIST`) without charging the customer.

---

## 3. Bespoke Concierge Desk
Allows customers to request custom jet transfers, Michelin dining reservations, or coastal villa rentals with live two-way messaging between customer and concierge staff.
