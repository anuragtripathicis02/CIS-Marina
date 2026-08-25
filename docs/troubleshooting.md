# TROUBLESHOOTING & FREQUENTLY ASKED QUESTIONS

## 1. Common Operational Questions

### Q1: What should I do if a payment webhook fails?
- **Answer**: Payment webhooks enforce server-side signature verification and idempotency keys. If a webhook fails due to temporary network degradation, Stripe automatically retries delivery up to 5 times. Alternatively, inspect payment statuses at `/admin/financials` and click **Sync Payment Status**.

### Q2: Why does an AI tool query return HTTP 403 Access Denied?
- **Answer**: AI analytics tools strictly enforce server-side tenant isolation (`TenantGuard`). Asking for data belonging to another organization (e.g. Organization B) triggers a 403 Forbidden rejection to prevent data leakage.

### Q3: How do I check if the API backend is healthy?
- **Answer**: Query the public health check probe at `GET http://localhost:4000/api/v1/health`. It returns database ping latency, uptime, and memory heap statistics.
