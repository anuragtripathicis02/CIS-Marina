# AUTOMATION WORKFLOW ENGINE & IDEMPOTENCY SPECIFICATION

## 1. Trigger-Condition-Action Architecture
- **Triggers**: `LEAD_CREATED`, `BOOKING_CREATED`, `BOOKING_CONFIRMED`, `PAYMENT_PENDING`, `CHARTER_UPCOMING`, `CHARTER_COMPLETED`, `MEMBERSHIP_EXPIRING`.
- **Conditions**: Payment status, booking value, customer country, lead score.
- **Actions**: Send Email, Send WhatsApp, Create Task, Update Lead Status.

---

## 2. Event Idempotency Guard (Critical Test 2)
To prevent duplicate emails, notifications, or task creations when an event triggers multiple times:
- Every execution evaluates `(workflowId, eventId)` in `automation_runs`.
- If an entry exists for the `eventId`, the second run is **SKIPPED** (`result: SKIPPED`), suppressing duplicate actions.
