# Licensing Plan & Roadmap

## Overview

This document outlines the roadmap for implementing an automated "License Key Generator" for digital products (specifically Source Code boilerplates) on the KangJessy Digital Store.

## Goals

1. **Automated Issuance**: Generate a unique license key immediately upon approved purchase.
2. **Verification System**: Provide an API endpoint to validate keys within the boilerplates.
3. **Usage Tracking**: Monitor active instances (optional, for future).

## Roadmap

### Phase 1: Manual Generation (Current MVP)

- **Flow**:
  - User purchases -> Status "Pending".
  - Admin verifies payment -> Status "Approved".
  - Admin manually generates (or picks) a key and attaches it to the order note/email (or initially just provides download access without key enforcement).
- **Deliverable**: No code enforcement yet. Just database schema preparation.

### Phase 2: Automated Generator (Next Step)

- **Trigger**: `payment.approved` event.
- **Logic**:
  - Generate UUID or formatted key (e.g., `KJ-XXXX-XXXX-XXXX`).
  - Store in `licenses` table linked to `user_id` and `product_id`.
- **Display**: Show key in User Dashboard > My Purchases.

### Phase 3: Validation API

- **Endpoint**: `/api/license/validate`
- **Method**: POST
- **Payload**: `{ key: "KJ-...", domain: "client-site.com" }`
- **Response**: `{ valid: true, owner: "..." }`
- **Implementation**: Boilerplates will fetch this endpoint during setup/init to verify ownership.

## Database Schema (Proposed)

```sql
table licenses {
  id: uuid primary key
  key: string unique
  user_id: reference(auth.users)
  product_id: reference(products)
  status: 'active' | 'revoked'
  created_at: timestamp
  expires_at: timestamp (nullable)
}
```

## Security Note

- License keys should be treated as sensitive data.
- Rate limiting on the validation API to prevent brute-force attacks.
