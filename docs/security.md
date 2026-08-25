# PLATFORM SECURITY ARCHITECTURE & AUDIT SUITE

## 1. Multi-Tenant Isolation & IDOR Guards
All database models incorporate `organization_id`. Every REST API controller and business service inspects the authenticated tenant context. Cross-tenant access attempts return `403 Forbidden`.

---

## 2. API Security, Headers & Rate Limiting
- **Helmet Headers**: `X-Frame-Options: DENY`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`.
- **CORS Control**: Restricts cross-origin API calls using `ALLOWED_ORIGINS`.
- **Rate Limiting**: Throttler limits auth endpoints, payment webhooks, and AI prompt requests.
- **Request Tracing**: `X-Correlation-ID` header injected into all requests and structured log entries.

---

## 3. Webhook Idempotency & Signature Security
Stripe and IoT webhooks enforce signature validation, replay attack prevention, and server-side idempotency keys. Duplicate webhook deliveries result in a single financial transaction.
