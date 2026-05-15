# Project: Personal Trainer (SwastikFit)

This file contains team-shared architecture, conventions, workflows, and repo guidance.

## Architecture
- **Framework:** Next.js 16 (App Router) with TypeScript.
- **Database:** PostgreSQL managed via **Prisma ORM**.
- **Authentication:** **NextAuth.js** (GitHub Provider) for secure user sessions and data isolation.
- **Nutrition Data:** Integration with the **Edamam Food Database API** for real-time food search. Includes a local `FoodCache` model in Prisma to reduce API calls.
- **Styling:** Vanilla CSS with a comprehensive set of CSS Variables (`globals.css`) for theme consistency.

## Conventions
- **UI Components:** Functional React components located in `src/components`.
- **API Routes:** Located in `src/app/api`, utilizing Next.js Route Handlers.
- **Database Access:** Always use the shared Prisma client instance from `@/lib/db`.
- **Styling:** Use CSS variables for colors, spacing, and radius to maintain "SwastikFit" aesthetics.

## Workflows
- **Food Logging:** 
    1. Search query hits `/api/food/search`.
    2. API checks `FoodCache` table first.
    3. If miss, fetches from Edamam and populates cache.
    4. Selected foods are posted to `FoodLog` table.
- **Step Tracking:** Daily steps logged to `StepLog` (Integration in progress).
- **Training Plan:** Static PPL split data model rendered via `src/app/training/page.tsx`.
