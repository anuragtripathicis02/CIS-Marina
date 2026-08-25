# MARINA & BERTH MANAGEMENT SPECIFICATION

## 1. Berth Physical Capacity Validation (Critical Test 1)
Before confirming any berth reservation, the backend validates:
- `vessel.lengthFt <= berth.maxLengthFt`
- `vessel.beamFt <= berth.maxBeamFt`
- `vessel.draftFt <= berth.maxDraftFt`

If any dimension is exceeded, the request is rejected with `400 Bad Request` ("This vessel does not meet the requirements for this berth.").

---

## 2. Berth Double-Booking Conflict Protection (Critical Test 2)
To prevent double-booking, the backend evaluates overlapping date ranges for reservations in active states (`RESERVED`, `CONFIRMED`, `CHECK_IN`, `OCCUPIED`):

$$\text{Conflict Condition: } (\text{existingCheckIn} < \text{requestedCheckOut}) \land (\text{existingCheckOut} > \text{requestedCheckIn})$$

If an overlap exists for the requested berth, the server rejects the request with `409 Conflict` ("Berth is no longer available for the selected dates.").

---

## 3. Check-In & Check-Out Workflow
- Dockmasters execute check-in / check-out with condition ratings (1 to 5 stars).
- Poor condition ratings (`< 3 stars`) automatically trigger operational maintenance issue logs.
