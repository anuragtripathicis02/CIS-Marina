# BACKGROUND JOBS & ASYNCHRONOUS WORKERS REGISTER

## 1. Registered System Background Jobs

| Job Name | Frequency | Target Sub-System | Dependencies | Failure & Retry Policy |
| :--- | :---: | :--- | :--- | :--- |
| **`AnalyticsMetricsAggregationJob`** | Daily at 01:00 UTC | Executive BI & Analytics | Database connection | Exponential backoff (3 retries). |
| **`RevenueForecastRunJob`** | Weekly on Sunday 02:00 UTC | Predictive Forecasting Engine | Historical bookings & revenue | Retries max 2 times; logs error. |
| **`IoTAnomalyDetectionWorker`** | Continuous (Every 5 mins) | Smart Fleet & IoT Telemetry | Telemetry records & Alert rules | Idempotent; skips processed events. |
| **`EmailNotificationQueueWorker`** | Every 1 minute | Customer & Staff Notifications | SMTP Provider / SendGrid | Queue retry up to 5 attempts. |
| **`MarinaContractExpiryChecker`** | Daily at 06:00 UTC | Marina Slip Contracts | Marina contracts database | Retries daily; idempotent update. |
| **`GDPRPrivacyRequestProcessor`** | Daily at 03:00 UTC | Compliance & GDPR Engine | S3 & Privacy requests DB | Audit logged; retries on lock. |
