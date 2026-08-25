# ALERT ENGINE & DEDUPLICATION SPECIFICATION

## Alert Engine Workflow
1. **Telemetry Evaluation**: Every incoming metric is evaluated against active `AlertRule` thresholds for the tenant and vessel.
2. **Deduplication & Cooldown**:
   - When a breach occurs (e.g. `BATTERY_VOLTAGE < 11.5V`), the alert engine queries for an existing `OPEN` alert for that metric.
   - If an `OPEN` alert exists, its `triggerCount` is incremented and `lastTriggeredAt` is updated. No new alert record is created.
   - If no `OPEN` alert exists, a new `Alert` record is generated.
3. **Alert Lifecycle**: `OPEN` → `ACKNOWLEDGED` → `RESOLVED` / `DISMISSED`.
4. **Maintenance Integration**: Authorised users can convert an alert into a **Maintenance Recommendation** via `POST /api/v1/alerts/:id/recommend-maintenance`, creating a Phase 2 Maintenance Work Order.
