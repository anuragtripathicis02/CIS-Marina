# API Blueprint & Endpoint Specification — Smart Yacht & Marina Management Platform

## 1. REST API Standards & Conventions

- **Base URL**: `/api/v1`
- **Protocol**: HTTPS (TLS 1.3 required in production)
- **Data Format**: `application/json`
- **Authentication**: `Authorization: Bearer <JWT_ACCESS_TOKEN>`
- **Tenant Context Header**: `X-Organization-ID: <UUID>` (Optional when implicit in JWT)

---

## 2. Standard Response Envelope

All API responses follow a uniform response wrapper:

### 2.1 Success Response
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2026-08-21T16:15:00.000Z",
    "correlationId": "req-9876543210",
    "page": 1,
    "limit": 20,
    "totalItems": 150,
    "totalPages": 8
  }
}
```

### 2.2 Standard Error Response
```json
{
  "success": false,
  "error": {
    "errorCode": "BOOKING_DATES_UNAVAILABLE",
    "message": "The selected yacht is reserved for the requested time range.",
    "statusCode": 409,
    "timestamp": "2026-08-21T16:15:00.000Z",
    "correlationId": "req-9876543210",
    "details": [
      {
        "field": "startTime",
        "issue": "Conflicting booking #BK-8821 exists between 14:00 and 18:00 UTC."
      }
    ]
  }
}
```

---

## 3. Phase 1 Endpoint Catalog

### 3.1 Authentication & Onboarding (`/api/v1/auth`)
| Method | Endpoint | Description | Auth | Roles Allowed |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Register new organization & owner account | Public | Public |
| `POST` | `/auth/login` | Authenticate user & issue JWT pair | Public | Public |
| `POST` | `/auth/refresh` | Refresh access token using refresh token | Public | Public |
| `POST` | `/auth/forgot-password` | Initiate password reset email | Public | Public |
| `POST` | `/auth/reset-password` | Complete password reset | Public | Public |
| `GET`  | `/auth/me` | Fetch authenticated user profile & permissions | Bearer | All Authenticated |

### 3.2 Yacht Management (`/api/v1/yachts`)
| Method | Endpoint | Description | Auth | Roles Allowed |
| :--- | :--- | :--- | :--- | :--- |
| `GET`  | `/yachts` | List fleet yachts with pagination & filters | Bearer | Public / Admin / Staff |
| `POST` | `/yachts` | Register new yacht in organization fleet | Bearer | Org Admin, Operations Manager |
| `GET`  | `/yachts/:id` | Fetch detailed yacht information & photos | Bearer | Public / Admin / Staff |
| `PUT`  | `/yachts/:id` | Update yacht specifications & base rates | Bearer | Org Admin, Fleet Manager |
| `DELETE`| `/yachts/:id` | Soft delete yacht from fleet | Bearer | Org Admin |
| `GET`  | `/yachts/:id/availability`| Check availability schedule for date range | Bearer | Public / All Staff |
| `POST` | `/yachts/:id/blocked-dates`| Add blackout dates for maintenance/owner | Bearer | Org Admin, Operations Manager |

### 3.3 Customer Management (`/api/v1/customers`)
| Method | Endpoint | Description | Auth | Roles Allowed |
| :--- | :--- | :--- | :--- | :--- |
| `GET`  | `/customers` | List customer CRM records with search | Bearer | Org Admin, Booking Manager |
| `POST` | `/customers` | Create new customer profile manually | Bearer | Org Admin, Booking Manager |
| `GET`  | `/customers/:id` | Get customer profile & booking history | Bearer | Org Admin, Booking Manager |
| `PUT`  | `/customers/:id` | Update customer details & VIP status | Bearer | Org Admin, Booking Manager |

### 3.4 Booking Engine (`/api/v1/bookings`)
| Method | Endpoint | Description | Auth | Roles Allowed |
| :--- | :--- | :--- | :--- | :--- |
| `GET`  | `/bookings` | List organization bookings with status filter | Bearer | Org Admin, Booking Manager |
| `POST` | `/bookings` | Create new booking inquiry/reservation | Bearer | Customer, Booking Manager |
| `GET`  | `/bookings/:id` | Fetch complete booking record & status | Bearer | Customer (Own), Staff |
| `POST` | `/bookings/:id/quote` | Issue formal price quote to customer | Bearer | Booking Manager |
| `POST` | `/bookings/:id/confirm` | Confirm booking reservation | Bearer | Booking Manager |
| `POST` | `/bookings/:id/cancel` | Cancel booking & trigger refund policy | Bearer | Customer (Own), Booking Manager |

### 3.5 Payments & Invoicing (`/api/v1/payments`)
| Method | Endpoint | Description | Auth | Roles Allowed |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/payments/intent` | Create Stripe payment intent for booking | Bearer | Customer, Booking Manager |
| `POST` | `/payments/webhook` | Handle payment gateway webhooks | Public (Signature) | Gateway Service |
| `GET`  | `/payments/invoices/:id`| Download official PDF invoice | Bearer | Customer (Own), Finance Manager |
| `POST` | `/payments/refund` | Process full/partial refund | Bearer | Finance Manager, Org Admin |
