# Troubleshooting & Problem Log

This file tracks technical hurdles encountered during development and their respective solutions.

## Architecture & Infrastructure

### 1. Prisma Client Location
- **Problem:** Standard `@prisma/client` generation sometimes causes issues in monorepos or specific deployment environments.
- **Solution:** Configured custom output in `schema.prisma` to `./generated/prisma` and exported a singleton from `src/lib/db.ts` to ensure a single connection instance across Next.js hot-reloads.

### 2. Edamam API Rate Limiting
- **Problem:** Excessive API calls to Edamam during development could hit rate limits or incur costs.
- **Solution:** Implemented a `FoodCache` table in PostgreSQL. The system now searches the local cache before making external requests, significantly improving speed and reliability.

## Authentication

### 1. Database Session Persistence
- **Problem:** NextAuth sessions need to be linked to the PostgreSQL database to persist user logs (Food/Steps).
- **Solution:** Integrated `@auth/prisma-adapter` in `src/app/api/auth/[...nextauth]/route.ts` to automatically sync GitHub users with our Prisma `User` model.

### 2. Next.js Data Caching (App Router)
- **Problem:** Data fetched via `fetch()` in Client Components appeared stale, and UI wouldn't update after POST/DELETE operations even when database changes were confirmed.
- **Solution:** Added `{ cache: 'no-store' }` to all internal API fetch calls to ensure the browser always retrieves the latest data from the server.

### 3. NextAuth session detection in API Routes
- **Problem:** `getServerSession()` was returning `null` in API routes even when the user was logged in, causing logs to fail silently (401 Unauthorized).
- **Solution:** Extracted `authOptions` to a shared `src/lib/auth.ts` file and passed it as an argument to every `getServerSession(authOptions)` call. This ensures the backend correctly identifies the user session.

## Data Integrity

### 1. StepLog duplicate rows (one-per-day enforcement)
- **Problem:** `StepLog` has a `@@unique([userId, date])` constraint, but `date` previously defaulted
  to `now()` (a full timestamp), so the constraint never actually prevented multiple step entries per
  day. The POST handler also hand-rolled find→update/create, which could race into duplicates.
- **Solution:** Writes now normalize `date` to the start of the user's local day (`getDayStart` in
  `src/lib/day.ts`) and use `db.stepLog.upsert` on the compound key, so there is genuinely one row
  per user per day.
- **One-time cleanup (if upgrading an existing DB):** rows created before this change may hold
  arbitrary timestamps and could still collide oddly. If you see stale/duplicate step rows, clear
  them once: `DELETE FROM "StepLog";` (single-user dev DB — low risk), then re-log today's steps.

---
*Add new logs below as they occur.*
