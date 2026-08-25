# Local Development & Environment Setup Guide

## 1. Environment Prerequisites

Ensure the following tools are installed on your workstation:

- **Node.js**: v20.x LTS or higher
- **pnpm**: v9.x or higher (`npm install -g pnpm`)
- **Docker Desktop**: v24.x or higher with Docker Compose
- **Git**: v2.40+

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env` in the root workspace directory:

```bash
cp .env.example .env
```

### Key Environment Variables Dictionary:
```ini
# --- SYSTEM & NODE ---
NODE_ENV=development
PORT=4000
WEB_URL=http://localhost:3000
API_URL=http://localhost:4000/api/v1

# --- POSTGRESQL DATABASE ---
DATABASE_URL=postgresql://yacht_admin:yacht_secret_pass@localhost:5432/yacht_platform_db?schema=public

# --- REDIS CACHE & QUEUES ---
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# --- AUTHENTICATION & JWT ---
JWT_SECRET=super_secret_jwt_key_change_in_production_min_32_chars
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# --- OBJECT STORAGE (S3 COMPATIBLE) ---
STORAGE_PROVIDER=s3
STORAGE_ENDPOINT=http://localhost:9000 # MinIO for local dev
STORAGE_BUCKET=yacht-platform-assets
STORAGE_ACCESS_KEY=minioadmin
STORAGE_SECRET_KEY=minioadmin
STORAGE_REGION=us-east-1

# --- PAYMENT GATEWAYS ---
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_WEBHOOK_SECRET=whsec_placeholder

# --- NOTIFICATION PROVIDERS ---
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.placeholder
FROM_EMAIL=noreply@yachtplatform.com
```

---

## 3. Starting Infrastructure Services (Docker)

Spin up PostgreSQL 16 and Redis 7 containers locally:

```bash
docker-compose up -d
```

Verify service status:

```bash
docker-compose ps
```

---

## 4. Installing Monorepo Dependencies

Install dependencies across all workspaces (`apps/web`, `apps/api`, `packages/*`):

```bash
pnpm install
```

---

## 5. Running Applications in Development Mode

Run all applications concurrently with Turborepo hot-reloading:

```bash
pnpm dev
```

- **Frontend Application**: `http://localhost:3000`
- **Backend API Server**: `http://localhost:4000/api/v1`
- **OpenAPI / Swagger Specs**: `http://localhost:4000/api/v1/docs`

---

## 6. Verification & Build Diagnostics

Run linting, type-checking, and build validation across all packages:

```bash
pnpm lint
pnpm typecheck
pnpm build
```
