# ANALYTICS DATA AGGREGATION & KPI ENGINE SPECIFICATION

## 1. Analytics Data Layer Architecture
Analytics metrics (`analytics_metrics`) are aggregated daily, weekly, and monthly via background jobs, separating analytical workloads from customer-facing transactional looper threads.

---

## 2. Reusable KPI Engine
KPIs (`kpi_definitions`) evaluate current values against target, warning, and critical thresholds using predefined metric definitions. Unsafe arbitrary SQL string execution is strictly prohibited.
