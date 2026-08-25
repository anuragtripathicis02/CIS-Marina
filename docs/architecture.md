# System Architecture — Smart Yacht & Marina Management Platform

## 1. High-Level Technical Architecture

The platform is designed as a **modular, scalable monorepo B2B SaaS application**. The architecture decouples the public-facing luxury website and client applications from the core business API layer while enforcing strong multi-tenant boundaries and clean domain abstractions.

```
                                  +-------------------------------------------------+
                                  |                CLIENT LAYERS                    |
                                  +-------------------------------------------------+
                                  |  Web Marketing & Discovery (Next.js App Router) |
                                  |  Admin Operational Dashboard (Next.js React)    |
                                  |  Customer Self-Service Portal (Next.js React)   |
                                  |  [Future] VIP Mobile App (React Native/Flutter) |
                                  +-------------------------------------------------+
                                                          |
                                                    HTTPS / REST API
                                                          v
                                  +-------------------------------------------------+
                                  |             API GATEWAY / NESTJS BACKEND        |
                                  +-------------------------------------------------+
                                  |  Global Interceptors: CORS, RateLimit, Logging  |
                                  |  Auth & Tenant Guards: JWT, RBAC, Tenant Context|
                                  |-------------------------------------------------|
                                  |  MODULAR DOMAIN SERVICES:                       |
                                  |  - Auth & Identity     - Customer CRM             |
                                  |  - Organization Scope  - Booking Engine State    |
                                  |  - Yacht & Availability - Payment Adapters      |
                                  |  - Audit Log Manager   - Notification Queue     |
                                  +-------------------------------------------------+
                                          /               |               \
                                         v                v                v
                     +-----------------------+  +-------------------+  +---------------------+
                     | PostgreSQL 16 (Source)|  | Redis 7 (Cache,   |  | Object Storage      |
                     | - Shared Database     |  | Lock, Queues)     |  | (S3 / R2 / Spaces)  |
                     | - Row Level Security  |  | - Booking Locks   |  | - Vessel media      |
                     | - Numeric Precision   |  | - Session Cache   |  | - Digital Contracts |
                     | - Exclusion Locks     |  | - BullMQ Jobs     |  | - Invoices & Docs   |
                     +-----------------------+  +-------------------+  +---------------------+
                                                          |
                                                          v
                                               +--------------------+
                                               | [Phase 3] Timescale|
                                               | Telemetry DB       |
                                               +--------------------+
```

---

## 2. Monorepo Structure & Modular Design

The repository is organized using `pnpm` workspaces and `Turborepo`:

```
/
├── apps/
│   ├── web/                        # Next.js 14 Web Application (Public + Admin + Portal)
│   └── api/                        # NestJS Backend API Server (Modular Architecture)
├── packages/
│   ├── types/                      # Shared TypeScript Interfaces, Enums, DTOs & Schemas
│   ├── ui/                         # Shared Design System Tokens, Tailwind CSS, UI Primitives
│   └── config/                     # Shared ESLint, Prettier, TSConfig configurations
├── infrastructure/                 # Docker Compose, Database migrations, deployment scripts
└── docs/                           # Comprehensive System Documentation & Blueprints
```

---

## 3. Backend Architecture (NestJS Modules)

The NestJS backend (`apps/api`) follows strict domain-driven modularity. Each business domain resides in its own isolated module with clean interfaces:

```
apps/api/src/
├── main.ts                         # Application Bootstrap, Global Pipes, Swagger Setup
├── app.module.ts                   # Root Application Module
├── common/                         # Platform-wide Infrastructure & Cross-cutting Concerns
│   ├── adapters/                   # Storage, Payment, Notification Provider Interfaces
│   ├── database/                   # Database Client & Row Level Security Setup
│   ├── decorators/                 # @CurrentTenant(), @CurrentUser(), @Permissions()
│   ├── filters/                    # Global Exception Filter (Standard Error Format)
│   ├── interceptors/               # TenantContextInterceptor, AuditLogInterceptor
│   └── guards/                     # JwtAuthGuard, RolesGuard, TenantIsolationGuard
└── modules/                        # Domain Business Modules
    ├── auth/                       # Authentication (JWT, Refresh Tokens, Password Hashing)
    ├── organizations/              # Tenant Onboarding & Organization Management
    ├── users/                      # User Identity & Role Assignment
    ├── yachts/                     # Yacht Inventory, Amenities, Documents & Pricing
    ├── availability/               # Vessel Availability Engine & Blackout Schedules
    ├── customers/                  # Customer CRM, Preferences & Profiles
    ├── bookings/                   # Booking State Machine, Quote & Confirmation Workflows
    ├── payments/                   # Payment Engine & Provider Integrations (Stripe)
    ├── notifications/              # Multi-channel Notification Dispatcher
    └── audit-logs/                 # Immutable Change Logging & Audit History
```

---

## 4. Provider Abstraction Architecture

To prevent vendor lock-in and support regional market requirements, core external integrations use strict TypeScript interfaces with concrete adapter implementations:

### 4.1 Payment Architecture (`PaymentService`)
```typescript
export interface IPaymentProvider {
  createPaymentIntent(params: CreatePaymentParams): Promise<PaymentIntentResult>;
  capturePayment(paymentId: string): Promise<PaymentStatusResult>;
  refundPayment(params: RefundPaymentParams): Promise<RefundResult>;
  cancelPayment(paymentId: string): Promise<boolean>;
  handleWebhook(payload: any, signature: string): Promise<WebhookEventResult>;
}

// Supported Adapters: StripeAdapter (Phase 1), RazorpayAdapter (Phase 2), AdyenAdapter (Phase 2)
```

### 4.2 Storage Architecture (`StorageService`)
```typescript
export interface IStorageProvider {
  uploadFile(file: Buffer, path: string, mimeType: string): Promise<UploadResult>;
  getSignedUrl(path: string, expiresInSeconds: number): Promise<string>;
  deleteFile(path: string): Promise<boolean>;
}

// Supported Adapters: S3StorageAdapter (AWS S3, Cloudflare R2, DigitalOcean Spaces)
```

### 4.3 Notification Architecture (`NotificationService`)
```typescript
export interface INotificationProvider {
  sendEmail(options: EmailOptions): Promise<boolean>;
  sendSMS(options: SMSOptions): Promise<boolean>;
  sendWhatsApp(options: WhatsAppOptions): Promise<boolean>;
}

// Adapters: SendGrid/Resend (Email), Twilio/MessageBird (SMS/WhatsApp)
```

---

## 5. Audit Logging Architecture

Every state-mutating operation (Create, Update, Delete, Status Transition, Permission Change) passes through an `AuditLogInterceptor` that captures:

- `id`: UUID (Primary Key)
- `organization_id`: UUID (Tenant scope)
- `actor_user_id`: UUID (User performing the action)
- `action`: String (`BOOKING_CREATED`, `PAYMENT_CAPTURED`, `YACHT_UPDATED`)
- `entity_name`: String (`bookings`, `yachts`, `users`)
- `entity_id`: UUID
- `previous_state`: JSONB (State before mutation)
- `new_state`: JSONB (State after mutation)
- `ip_address`: String
- `user_agent`: String
- `created_at`: TIMESTAMPTZ (UTC)

This structure satisfies high enterprise compliance and auditability requirements.
