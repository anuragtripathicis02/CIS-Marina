# Database Architecture & Entity Specification — Smart Yacht & Marina Management Platform

## 1. Core Database Philosophy

- **Primary Source of Truth**: PostgreSQL 16.
- **Identifiers**: All primary identifiers use Universally Unique Identifiers (`UUIDv4`).
- **Financial Precision**: All monetary values use `NUMERIC(14,2)` paired with explicit ISO 4217 `currency VARCHAR(3)` codes. Floating-point numbers (`FLOAT`, `DOUBLE`) are strictly forbidden for money.
- **Timestamps**: All temporal fields are stored as `TIMESTAMPTZ` (UTC). Frontends handle timezone conversion for users.
- **Soft Deletion**: Entities use `deleted_at TIMESTAMPTZ NULL` for audited soft deletion where appropriate.
- **Tenant Scope**: All tenant-owned tables contain an `organization_id UUID NOT NULL` reference.

---

## 2. PostgreSQL Row-Level Security (RLS) Blueprint

To guarantee strict multi-tenant isolation, PostgreSQL Row Level Security (RLS) is enabled on all tenant-owned tables:

```sql
-- Example RLS Policy for 'bookings' table
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON bookings
    FOR ALL
    USING (organization_id = CURRENT_SETTING('app.current_organization_id', true)::uuid);
```

When a NestJS database connection handles a request, the `TenantContextInterceptor` sets the session variable before executing queries:

```sql
SET LOCAL app.current_organization_id = '123e4567-e89b-12d3-a456-426614174000';
```

---

## 3. Double-Booking Protection (Exclusion Constraints)

To prevent race conditions where two customers attempt to book the exact same yacht for overlapping dates, PostgreSQL **Exclusion Constraints** (using `btree_gist`) are enforced at the database kernel level:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE bookings ADD CONSTRAINT no_overlapping_yacht_bookings
    EXCLUDE USING gist (
        yacht_id WITH =,
        tsrange(start_time, end_time, '[)') WITH &&
    ) WHERE (status NOT IN ('CANCELLED', 'REJECTED', 'EXPIRED'));
```

*This guarantees data integrity even under extreme parallel API traffic.*

---

## 4. Phase 1 Entity Schemas

### 4.1 Organization Domain (`organizations`)
```sql
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    legal_name VARCHAR(255),
    tax_id VARCHAR(100),
    country_code VARCHAR(2) NOT NULL, -- ISO 3166-1 alpha-2
    default_currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    timezone VARCHAR(50) NOT NULL DEFAULT 'UTC',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100),
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    latitude NUMERIC(10,8),
    longitude NUMERIC(11,8),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 4.2 Identity & Access Domain (`users`, `roles`, `permissions`)
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50),
    is_active BOOLEAN NOT NULL DEFAULT true,
    email_verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE, -- NULL for platform global roles
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(organization_id, code)
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'bookings.create'
    description TEXT,
    category VARCHAR(50) NOT NULL
);

CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, role_id)
);

CREATE TABLE role_permissions (
    role_id UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY(role_id, permission_id)
);
```

### 4.3 Yacht Domain (`yachts`, `yacht_availability`, `yacht_pricing`)
```sql
CREATE TABLE yachts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    make VARCHAR(100),
    model VARCHAR(100),
    year_built INT,
    length_ft NUMERIC(6,2),
    capacity_passengers INT NOT NULL,
    cabins INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    home_port_id UUID REFERENCES locations(id),
    hourly_rate NUMERIC(14,2),
    daily_rate NUMERIC(14,2),
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE yacht_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    yacht_id UUID NOT NULL REFERENCES yachts(id) ON DELETE CASCADE,
    storage_path VARCHAR(500) NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE yacht_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    yacht_id UUID NOT NULL REFERENCES yachts(id) ON DELETE CASCADE,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    is_blocked BOOLEAN NOT NULL DEFAULT true,
    reason VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 4.4 Customer Domain (`customers`)
```sql
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(50),
    nationality VARCHAR(100),
    passport_number VARCHAR(100),
    vip_status BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 4.5 Booking Domain (`bookings`, `booking_items`, `booking_status_history`)
```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    booking_reference VARCHAR(20) NOT NULL UNIQUE,
    yacht_id UUID NOT NULL REFERENCES yachts(id),
    customer_id UUID NOT NULL REFERENCES customers(id),
    status VARCHAR(50) NOT NULL DEFAULT 'INQUIRY',
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    passenger_count INT NOT NULL,
    subtotal_amount NUMERIC(14,2) NOT NULL,
    tax_amount NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    discount_amount NUMERIC(14,2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(14,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    special_requests TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE booking_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    from_status VARCHAR(50),
    to_status VARCHAR(50) NOT NULL,
    changed_by_user_id UUID REFERENCES users(id),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 4.6 Payment Domain (`payments`, `invoices`)
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    booking_id UUID NOT NULL REFERENCES bookings(id),
    payment_reference VARCHAR(100) NOT NULL UNIQUE,
    provider VARCHAR(50) NOT NULL, -- e.g., 'STRIPE'
    provider_transaction_id VARCHAR(255),
    amount NUMERIC(14,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'USD',
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING', -- PENDING, CAPTURED, REFUNDED, FAILED
    payment_method VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### 4.7 Audit Log Domain (`audit_logs`)
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID REFERENCES organizations(id),
    actor_user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100) NOT NULL,
    entity_id UUID NOT NULL,
    previous_state JSONB,
    new_state JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. Future Database Domain Abstractions (Phases 2-4)

To prevent structural refactoring later, foreign key relationships for future domains are reserved:

1. **Crew Domain**: `crew`, `crew_assignments`, `crew_certifications` (linked to `yachts` and `bookings`).
2. **Maintenance Domain**: `maintenance_records`, `maintenance_schedules` (linked to `yachts`).
3. **Marina Domain**: `marinas`, `slips`, `slip_assignments` (linked to `yachts` and `organizations`).
4. **IoT Telemetry Domain**: High-volume sensor readings (`gps`, `engine`, `battery`, `bilge`) will be stored in a dedicated **TimescaleDB** extension hypertable partitioned by `vessel_id` and `timestamp`.
