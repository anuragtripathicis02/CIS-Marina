# SMART YACHT & MARINA MANAGEMENT PLATFORM
## STAGE 04 — PHASE 2 OPERATIONS MANAGEMENT TECHNICAL SPECIFICATION

### 1. Overview & Architecture
Phase 2 extends the platform from commercial booking transactions into full operational execution. It connects:

$$\text{BOOKING} \longrightarrow \text{YACHT} \longrightarrow \text{CREW} \longrightarrow \text{CHECKLIST} \longrightarrow \text{INSPECTION} \longrightarrow \text{CHARTER} \longrightarrow \text{POST-CHARTER} \longrightarrow \text{MAINTENANCE} \longrightarrow \text{OPERATIONAL RECORDS}$$

---

### 2. Operational Modules & API Endpoints

#### Crew & Certifications (`/api/v1/crew`)
- `GET /api/v1/crew`: List all organization crew members with 90/30-day STCW certification expiry status calculations.
- `GET /api/v1/crew/:id`: Detailed crew profile including certifications, licenses, and assignments.
- `POST /api/v1/crew`: Create new crew member.
- `POST /api/v1/crew/:id/certifications`: Upload certification metadata and calculate `VALID`, `EXPIRING_SOON`, or `EXPIRED`.
- `POST /api/v1/crew/:id/licenses`: Add commercial marine license.

#### Conflict-Aware Crew Assignments (`/api/v1/crew/assignments`)
- `POST /api/v1/crew/assignments`: Assign crew to booking. Enforces backend double-booking conflict validation (`(startA < endB) AND (endA > startB)`). Rejects overlapping assignments with HTTP 409 Conflict.
- `GET /api/v1/crew/assignments/booking/:bookingId`: Fetch active crew roster for booking.
- `DELETE /api/v1/crew/assignments/:id`: Remove assignment and update crew status.

#### Maintenance Management (`/api/v1/maintenance`)
- `GET /api/v1/maintenance`: List work orders filtered by priority (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`) and status.
- `POST /api/v1/maintenance`: Create work order. If `isBlocking = true`, automatically injects a date block into `YachtAvailability` table and updates `Yacht.operationalStatus = MAINTENANCE`.
- `PATCH /api/v1/maintenance/:id/status`: Update status. When set to `COMPLETED`, clears availability block if no other active blocking maintenance exists.

#### Inspections & Failure Workflows (`/api/v1/inspections`)
- `GET /api/v1/inspections`: List pre-charter, post-charter, and general safety inspections.
- `POST /api/v1/inspections`: Initialize inspection.
- `PATCH /api/v1/inspections/items/:itemId`: Evaluate item (`PASS`, `FAIL`, `NOT_APPLICABLE`). If `FAIL`, automatically creates a prefilled `MaintenanceRecord` (`isBlocking = true`, priority `HIGH`).

#### Checklists Engine (`/api/v1/checklists`)
- `GET /api/v1/checklists/templates`: Fetch reusable checklist templates.
- `POST /api/v1/checklists/instances`: Create checklist execution instance for booking/yacht.
- `PATCH /api/v1/checklists/items/:itemId`: Update item result (`COMPLETED`, `FAILED`, `NOT_APPLICABLE`).

#### Vendors Directory (`/api/v1/vendors`)
- `GET /api/v1/vendors`: List marine yards, catering, and safety equipment vendors.
- `POST /api/v1/vendors`: Register new vendor.

#### Operations Control Center & Readiness Engine (`/api/v1/operations`)
- `GET /api/v1/operations/dashboard`: Executive KPIs (`Today's Charters`, `Yachts Ready`, `Crew Assigned`, `Maintenance Open`, `Inspections Pending`, `Certification Alerts`).
- `GET /api/v1/operations/alerts`: Real-time operational alerts (Expiring STCW certs, missing Captain, overdue maintenance).
- `GET /api/v1/operations/readiness/:yachtId`: Evaluates business rules and returns `isReady: boolean` with explicit missing reasons array.

---

### 3. Database Schema Extensions
Adds 14 new Prisma models (`CrewMember`, `CrewAvailability`, `CrewAssignment`, `CrewCertification`, `CrewLicense`, `CrewDocument`, `Vendor`, `MaintenanceRecord`, `ChecklistTemplate`, `ChecklistTemplateItem`, `ChecklistInstance`, `ChecklistInstanceItem`, `Inspection`, `InspectionItem`, `OperationalTask`) while preserving full multi-tenant isolation via `organizationId`.
