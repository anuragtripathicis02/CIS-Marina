# CRM, LEAD CONVERSION & DUPLICATE DETECTION SPECIFICATION

## 1. Duplicate Customer Detection (Critical Test 1)
Before converting a lead into a customer, the system queries:
- `email`
- `phoneNumber`

If a possible match is found, the system displays:
> "Possible existing customer found. Select existing customer profile or proceed with caution."

---

## 2. Lead Conversion Idempotency Guard
To prevent duplicate customer records when a conversion request is submitted multiple times:
- The system checks `lead.convertedCustomerId`.
- If set, the server returns the existing customer link without creating duplicate customer entries.

---

## 3. Customer 360 Activity Timeline
Consolidates all customer touchpoints chronologically:
`Lead Created` → `Calls` → `Emails` → `WhatsApp` → `Quotes` → `Bookings` → `Payments` → `Invoices` → `Marina Slips` → `Yacht Club Memberships`.
