# AI ASSISTANT, PERMISSIONS & SECURITY SPECIFICATION

## 1. Permission-Scoped Data Tools (Critical Test 3)
The AI Assistant queries authorized database tools (`getBookings()`, `getCustomers()`, `getLeads()`, `getRevenue()`, `getMarinaOccupancy()`, `getMaintenance()`).
- All tools filter data strictly by the logged-in user's `organizationId`.
- Any attempt to query data outside the user's organization context is **DENIED** with HTTP 403 Forbidden.

---

## 2. Human-in-the-Loop AI Principles
- AI acts strictly as an assistant generating editable drafts (Customer Responses, Email Campaigns, Marketing Copy).
- AI Pricing Recommendations require explicit **Manager Review & Approval** before database prices are updated.
- AI NEVER silently alters financial records, deletes customers, or controls vessel hardware.

---

## 3. AI Usage Logging
Every prompt execution records:
- `organizationId`, `userId`, `feature`, `provider`, `tokensUsed`, `estimatedCost`, `approvedStatus`, `timestamp`.
