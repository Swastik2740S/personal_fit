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

---
*Add new logs below as they occur.*
