# Primary User UX Flows — Smart Yacht & Marina Management Platform

## 1. Customer Discovery & Booking Flow

```
+------------------+     +-------------------+     +--------------------+
| 1. Homepage /    | --> | 2. Search & Filter| --> | 3. Yacht Detail    |
|    Discovery     |     |    Location/Dates |     |    Specs & Photos  |
+------------------+     +-------------------+     +--------------------+
                                                             |
                                                             v
+------------------+     +-------------------+     +--------------------+
| 6. Confirmation  | <-- | 5. Stripe Payment | <-- | 4. Checkout        |
|    & Invoice PDF |     |    Deposit / Full |     |    Add-ons & Guest |
+------------------+     +-------------------+     +--------------------+
```

### Detailed Flow Steps:
1. **Discovery**: Customer visits marketing homepage (`/`) or search page (`/charter`). Selects location (e.g. Dubai Marina), start/end date, passenger count.
2. **Browsing**: Interactive grid presents matching available vessels displaying hourly/daily rates in selected currency.
3. **Vessel Detail**: Customer reviews high-res photos, specs (length, cabins, capacity), included amenities, and selects charter slot.
4. **Checkout**: Customer provides guest contact details, selects optional add-ons (catering, jet ski rental), and views line-item pricing breakdown (subtotal, taxes, total deposit due).
5. **Payment**: Customer completes payment via embedded Stripe Payment Element.
6. **Confirmation**: Booking transitions to `DEPOSIT_PAID` or `CONFIRMED`. System sends automated email confirmation with PDF invoice link and displays confirmation dashboard.

---

## 2. Organization Admin Onboarding Flow

```
+------------------+     +-------------------+     +--------------------+
| 1. Register      | --> | 2. Organization   | --> | 3. Operational     |
|    Owner Account |     |    Details & Tax  |     |    Currency/TZ     |
+------------------+     +-------------------+     +--------------------+
                                                             |
                                                             v
+------------------+     +-------------------+     +--------------------+
| 6. Fleet Ready   | <-- | 5. Set Yacht Rates| <-- | 4. Add First Yacht |
|    for Bookings  |     |    & Availability |     |    Specs & Media   |
+------------------+     +-------------------+     +--------------------+
```

### Detailed Flow Steps:
1. **Account Creation**: Admin signs up at `/auth/register` with email, password, and full name.
2. **Organization Profile**: Sets organization legal business name, country of operation, and tax registration ID.
3. **Localization**: Configures primary base currency (e.g. `AED` or `EUR`) and primary operational timezone.
4. **Fleet Addition**: Navigates to `/admin/yachts/new` to create first vessel listing (name, registration #, length, passenger capacity, home port location, photos).
5. **Pricing & Availability**: Sets base hourly/daily rates and blocks off blackout maintenance dates on calendar.
6. **Team Invites**: Invites booking managers and finance staff with specific RBAC role assignments.

---

## 3. Booking Manager Operational Flow

```
+------------------+     +-------------------+     +--------------------+
| 1. Receive       | --> | 2. Review Dates & | --> | 3. Issue Formal    |
|    Inquiry       |     |    Availability   |     |    Price Quote     |
+------------------+     +-------------------+     +--------------------+
                                                             |
                                                             v
+------------------+     +-------------------+     +--------------------+
| 6. Charter       | <-- | 5. Collect Final  | <-- | 4. Customer Pays   |
|    Execution     |     |    Balance        |     |    Deposit         |
+------------------+     +-------------------+     +--------------------+
```

### Detailed Flow Steps:
1. **Inquiry Notification**: Booking manager receives alert of new customer booking inquiry.
2. **Review**: Manager inspects calendar dashboard (`/admin/calendar`) to verify vessel readiness and schedule.
3. **Quote Generation**: Manager applies seasonal discount or customized add-on fees and clicks `Issue Quote`.
4. **Deposit Capture**: System notifies customer; upon deposit payment, status advances to `CONFIRMED`.
5. **Pre-Charter Prep**: Manager sends digital waiver/contract for e-signature.
6. **Execution**: Charter is completed; status advances to `COMPLETED`; system prompts customer for feedback review.
