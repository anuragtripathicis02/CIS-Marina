# YACHT CLUB & MEMBER PORTAL SPECIFICATION

## 1. Membership Tiers & Benefits Engine
Organizations can define custom membership tiers (`Gold Flagship`, `Silver Mariner`, `Family Commodore`) with custom billing cycles (`MONTHLY`, `QUARTERLY`, `ANNUAL`) and configurable benefit arrays (Priority Berth Booking, Club Lounge Access, Regatta VIP Passes, Service Discounts).

---

## 2. Event Registration & Capacity Engine (Critical Test 3)
- Yacht Club events support maximum guest capacity settings (`capacity`).
- Submitting an event registration increments `registeredCount`.
- When `registeredCount >= capacity`, subsequent registration requests are rejected with `400 Bad Request` ("Event has reached maximum capacity limit.").

---

## 3. Member Portal (`/club/portal`)
Members access a dedicated dashboard displaying their membership tier, active benefits, registered events, berth reservations, and invoices.
