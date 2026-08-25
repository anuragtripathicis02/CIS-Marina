# CUSTOMER SECURITY, OWNERSHIP GUARDS & AI SAFETY SPECIFICATION

## 1. Server-Side Ownership Security Guards (Critical Test 1)
All customer portal endpoints evaluate resource ownership on the backend:
- `booking.customerId === authenticatedCustomerId`
- `conciergeRequest.customerId === authenticatedCustomerId`
- `supportTicket.customerId === authenticatedCustomerId`

Any attempt by Customer A to access Customer B's resources returns `403 Forbidden` ("Access Denied: You do not own this resource").

---

## 2. Double-Booking Checkout Revalidation (Critical Test 2)
Before capturing payment for a charter, the backend revalidates inventory availability against active bookings and operational blocks. If the dates are occupied, the server returns `409 Conflict` ("Inventory Unavailable: Yacht is no longer available.").

---

## 3. Server-Side Payment Verification (Critical Test 3)
Invoices and bookings are updated ONLY after verifying Stripe webhook signatures or provider payment tokens server-side. Frontend success flags alone are never trusted.

---

## 4. Customer AI Safety Rules (Critical Test 4)
- Customer AI answers queries strictly scoped to the authenticated customer's data context (`"What time is my check-in?"`).
- Any attempt to query another customer's data or expose internal operational notes is **REFUSED** with permission error.
