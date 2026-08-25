# Multi-Tenant Security & Isolation Blueprint

## 1. Overview

The platform uses a **Pooled Multi-Tenant Architecture with Discriminator Columns & PostgreSQL Row-Level Security (RLS)**.

- **Tenant Definition**: An `Organization` represents a tenant entity (e.g., a yacht charter company or marina operator).
- **Data Scoping**: Every tenant-owned entity includes an `organization_id UUID NOT NULL` reference.
- **Strict Isolation**: A user belonging to `Organization A` must never read, write, update, or delete data belonging to `Organization B`, regardless of frontend manipulations or query parameters.

---

## 2. Defence-in-Depth Multi-Tenancy Architecture

Security is enforced across four distinct layers:

```
[ LAYER 1: API Gateway / NestJS Guard ] ──> Validates JWT, extracts organization_id from token.
                   │
[ LAYER 2: AsyncLocalStorage Context ]  ──> Binds organization_id to current request execution thread.
                   │
[ LAYER 3: Service Layer Scoping ]     ──> Automatically injects organization_id into all ORM queries.
                   │
[ LAYER 4: Database RLS Enforcement ]  ──> PostgreSQL kernel rejects any row read/write outside app.current_organization_id.
```

---

## 3. Layer Breakdown

### Layer 1: JWT & Authorization Guard
When an authenticated user invokes an endpoint:
1. The `JwtAuthGuard` verifies the bearer token signature.
2. The `TenantGuard` verifies that the `organization_id` in the request header/path matches the `organization_id` embedded in the user's validated JWT token.

### Layer 2: AsyncLocalStorage Request Context
NestJS utilizes Node.js `AsyncLocalStorage` to store the active tenant context per async execution context without needing to manually pass `organization_id` through every service method call:

```typescript
// tenant-context.store.ts
import { AsyncLocalStorage } from 'async_hooks';

export interface ITenantContext {
  organizationId: string;
  userId: string;
  roles: string[];
}

export const tenantAsyncLocalStorage = new AsyncLocalStorage<ITenantContext>();
```

### Layer 3: Application & ORM Middleware
All Database repository operations automatically append `WHERE organization_id = tenantContext.organizationId`.

### Layer 4: PostgreSQL Row-Level Security (RLS)
As a fail-safe against application bugs or missing `WHERE` clauses, PostgreSQL Row-Level Security policies prevent cross-tenant data access at the DB engine level:

```sql
-- RLS Policy definition applied to all tenant tables:
CREATE POLICY tenant_isolation_policy ON yachts
    FOR ALL
    USING (organization_id = CURRENT_SETTING('app.current_organization_id', true)::uuid);
```

---

## 4. Enterprise Hybrid Multi-Tenancy Strategy

While Phase 1 utilizes a single PostgreSQL database with RLS isolation for cost efficiency and simple operations, the architecture supports **Dedicated Database Tenants** for enterprise customers without code refactoring:

1. **Shared Pool (Phase 1 Standard)**: Multiple organizations share a PostgreSQL database; tenant boundary enforced via `organization_id` and RLS.
2. **Dedicated Database (Phase 4 Enterprise)**: High-volume enterprise clients receive an isolated PostgreSQL database connection string dynamically resolved via tenant domain/slug lookups.
