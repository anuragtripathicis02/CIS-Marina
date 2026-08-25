# STAGE 05 — PHASE 3 SMART FLEET, IoT & REAL-TIME VESSEL MONITORING SPECIFICATION

## 1. Overview & Architecture
Phase 3 transforms the platform into a connected smart-vessel platform. It establishes a multi-tenant IoT ingestion pipeline, provider abstraction layer, alert engine with deduplication/cooldowns, geofence entry/exit engine, and real-time Server-Sent Events (SSE) stream.

$$\text{PHYSICAL / SIMULATED VESSEL} \longrightarrow \text{DEVICE GATEWAY} \longrightarrow \text{INGESTION API} \longrightarrow \text{NORMALIZATION} \longrightarrow \text{ALERT ENGINE} \longrightarrow \text{TIME-SERIES STORE} \longrightarrow \text{REAL-TIME SSE} \longrightarrow \text{SMART VESSEL DASHBOARD}$$

---

## 2. Implemented Modules & APIs

### Vessel Device Management (`/api/v1/devices`)
- `GET /api/v1/devices`: List all registered fleet devices.
- `GET /api/v1/devices/:id`: Detailed device metadata, firmware version, last seen, and device audit event log.
- `POST /api/v1/devices/register`: Device registration generating dedicated secret keys (`sec_...`) separate from User JWTs.

### Telemetry Ingestion & Time-Series (`/api/v1/telemetry`)
- `POST /api/v1/telemetry/ingest`: Secure normalized ingestion endpoint. Validates device identity, normalizes units (e.g. 0.78 fuel -> 78%), enforces `event_id` duplicate protection, and updates device heartbeat.
- `GET /api/v1/telemetry/history`: Retrieves track history polyline points and distance/speed statistics for map visualization.
- `GET /api/v1/telemetry/series`: Retrieves time-series metric points for charts (1h, 6h, 24h, 7d, 30d).
- `GET /api/v1/telemetry/stream`: Real-time Server-Sent Events (SSE) stream broadcasting live vessel updates.

### Alert Engine & Deduplication (`/api/v1/alerts`)
- `GET /api/v1/alerts`: List system alerts filtered by severity (`INFO`, `WARNING`, `CRITICAL`) and status (`OPEN`, `ACKNOWLEDGED`, `RESOLVED`, `DISMISSED`).
- `GET /api/v1/alerts/rules`: List threshold alert rules.
- `POST /api/v1/alerts/rules`: Create configurable rule (Metric, Operator, Threshold, Severity, Cooldown).
- `PATCH /api/v1/alerts/:id/status`: Transition alert status with notes and user attribution.
- `POST /api/v1/alerts/:id/recommend-maintenance`: Converts a telemetry alert into a Phase 2 Maintenance Recommendation.

### Geofencing Engine (`/api/v1/geofences`)
- `GET /api/v1/geofences`: List circular & polygon operating zones.
- `POST /api/v1/geofences`: Create geofence with Haversine radius calculation.
- `GET /api/v1/geofences/events`: Log of vessel `ENTRY` and `EXIT` events.

### IoT Mock Simulator (`/api/v1/simulator`)
- `POST /api/v1/simulator/start`: Start 5.0-second periodic telemetry loop for simulated fleet.
- `POST /api/v1/simulator/stop`: Pause simulation.
- `POST /api/v1/simulator/inject-anomaly`: Inject anomaly (`LOW_BATTERY`, `HIGH_SPEED`, `HIGH_ENGINE_TEMP`, `GEOFENCE_EXIT`).

---

## 3. Core Verification Rules
1. **Deduplication & Cooldown**: Repeated telemetry breaches (e.g. Battery = 11.2V) update the existing `OPEN` alert (`triggerCount` incremented) without creating duplicate alert records.
2. **Geofence State Machine**: Moving inside a geofence generates a single `ENTRY` event; remaining inside emits zero duplicate events.
3. **Data Freshness Indicator**: Every UI dashboard displays telemetry last updated timestamps (`✓ 6 sec ago`).
