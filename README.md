<div align="center">

# SwastikFit

### AI-Powered Body Recomposition Platform

Multi-user fitness tracker — onboard with your stats, get a TDEE-calibrated macro plan and a 6-day Push/Pull/Legs programme, log food, steps, bodyweight, and every lift with a progressive-overload target system.

<br/>

![Next.js](https://img.shields.io/badge/Next.js_16-09090b?style=for-the-badge&logo=next.js&logoColor=c8f542)
![React](https://img.shields.io/badge/React_19-09090b?style=for-the-badge&logo=react&logoColor=22d3ee)
![TypeScript](https://img.shields.io/badge/TypeScript-09090b?style=for-the-badge&logo=typescript&logoColor=3178c6)
![Prisma](https://img.shields.io/badge/Prisma_7-09090b?style=for-the-badge&logo=prisma&logoColor=fafafa)
![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-09090b?style=for-the-badge&logo=postgresql&logoColor=4169e1)

![Clerk](https://img.shields.io/badge/Clerk_7-09090b?style=for-the-badge&logo=clerk&logoColor=a855f7)
![Zod](https://img.shields.io/badge/Zod_4-09090b?style=for-the-badge&logo=zod&logoColor=3068b7)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-09090b?style=for-the-badge&logo=framer&logoColor=fbbf24)
![Edamam](https://img.shields.io/badge/Edamam_API-09090b?style=for-the-badge&logo=uber-eats&logoColor=c8f542)

</div>

---

## Features

| | Feature | Description |
|---|---|---|
| 🔐 | **Google sign-in** | Clerk 7 — hosted sign-in/sign-up UI, Svix webhooks for user sync |
| 📋 | **5-step onboarding** | Height / weight / age / sex / activity / goal / experience / diet / equipment |
| 🧮 | **TDEE calculation** | Mifflin-St Jeor with activity multiplier → per-user calorie + macro targets |
| 🍽️ | **Personalised meal plan** | Rule-based, diet-preference-aware (eggetarian, vegan, high-protein, low-carb, …) |
| 🏋️ | **6-Day Push/Pull/Legs** | Strength + Hypertrophy rotation, regeneratable from the Training page |
| 📈 | **Progressive overload log** | Log every lift; target system suggests `+2.5 kg` when you hit all reps, or "climb the rep range first" |
| 🍎 | **Food logging** | Search Edamam (auth-gated, 30-day cache), log by meal type + backfill up to 7 days |
| ⭐ | **Favourites & recents** | Star foods for instant re-add; recent foods normalised to per-100 g |
| 👟 | **Step tracking** | One entry per day, upserted — DayPills for 7-day backfill |
| ⚖️ | **Weight log** | Daily bodyweight history, same backfill pattern |
| 📊 | **Dashboard** | Live macro rings, step progress, consistency streak, 7-day adherence |
| 📈 | **Weekly report** | 7-day calorie, protein, step trends + summary table |
| 🎯 | **Editable goals** | Override TDEE-computed targets per-user in Settings |
| 🌗 | **Timezone-correct** | All "today" boundaries computed from the client's local day-start |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16.2.6 (App Router, Turbopack) · React 19 |
| **Language** | TypeScript (strict) |
| **Auth** | Clerk 7.4.3 — Google OAuth, `requireUser()` server helper, Svix webhook |
| **Database** | Neon serverless PostgreSQL via Prisma 7 (`@prisma/adapter-pg` pool) |
| **Validation** | Zod 4 (all API request bodies) |
| **UI / Motion** | Framer Motion 12 · lucide-react · plain CSS (CSS variables, frosted-glass dark theme) |
| **External API** | Edamam Food Database (nutrition lookup, cached) |

---

## Architecture

```mermaid
flowchart LR
    Browser["Browser\n(client pages)"]

    subgraph Next["Next.js 16 — App Router"]
        Pages["Client Components\nDashboard · Food · Steps · Weight\nTraining · Meals · Report · Settings"]
        API["Route Handlers\n/api/*"]
        Auth["requireUser()\nClerk auth()"]
        Proxy["proxy.ts\nClerk middleware"]
    end

    Prisma["Prisma 7\n(pg pool adapter)"]
    DB[("Neon PostgreSQL")]
    Edamam["Edamam\nFood API"]
    Clerk["Clerk\nGoogle OAuth"]

    Browser <-->|fetch JSON| API
    Browser --> Pages
    Proxy --> Clerk
    API --> Auth
    Auth --> Clerk
    API --> Prisma
    Prisma --> DB
    API -.->|cache miss| Edamam
```

---

## Data Model

```mermaid
erDiagram
    User ||--o{ FoodLog : logs
    User ||--o{ StepLog : logs
    User ||--o{ WeightLog : logs
    User ||--o{ LiftLog : logs
    User ||--o{ FavoriteFood : saves
    User ||--|| UserPlan : has

    User {
        string id PK "Clerk userId"
        string email UK
        string name
        bool onboardingComplete
        float heightCm
        float startingWeightKg
        int age
        string sex
        string activityLevel
        string primaryGoal
        string fitnessExperience
        string dietaryPreference
        string equipment
        int calGoal
        int protGoal
        int carbGoal
        int fatGoal
        int stepGoal
    }
    UserPlan {
        string id PK
        string userId FK
        string mealPlan "JSON MealPlanItem[]"
        string workoutPlan "JSON WorkoutDay[]"
        string summary
    }
    FoodLog {
        string id PK
        string userId FK
        string name
        float qty
        float cal
        float prot
        float carb
        float fat
        string mealType
        datetime date
    }
    StepLog {
        string id PK
        string userId FK
        int count
        datetime date "1 row per user per day"
    }
    WeightLog {
        string id PK
        string userId FK
        float weight
        datetime date "1 row per user per day"
    }
    LiftLog {
        string id PK
        string userId FK
        string exercise
        float weightKg
        int sets
        int reps
        string notes
        datetime date
    }
    FavoriteFood {
        string id PK
        string userId FK
        string name
        float cal
        float prot
        float carb
        float fat "stored per 100g"
    }
    FoodCache {
        string id PK
        string query UK
        string data "serialised Edamam results"
        datetime createdAt "30-day TTL"
    }
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create `.env.local` in the project root:

```bash
# Neon serverless PostgreSQL
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Clerk — https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Edamam Food Database — https://developer.edamam.com
EDAMAM_APP_ID="..."
EDAMAM_APP_KEY="..."
```

### 3. Apply migrations and generate the Prisma client

```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)**

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |
| `npx prisma migrate deploy` | Apply pending migrations |
| `npx prisma generate` | Regenerate Prisma client after schema changes |

---

## API Reference

All routes require a Clerk session except the webhook.

| Method | Route | Purpose |
|--------|-------|---------|
| `GET` | `/api/dashboard/stats` | Today's macro totals, steps, user goals |
| `GET` | `/api/dashboard/weekly` | 7-day aggregated trends |
| `GET · POST · DELETE` | `/api/food/log` | List / add / delete food entries |
| `GET` | `/api/food/search?q=` | Food search (auth-gated, Edamam + 30-day cache) |
| `GET · POST · DELETE` | `/api/food/favorites` | List / star / unstar favourite foods (per 100 g) |
| `GET` | `/api/food/recent` | Recently logged foods, normalised to per 100 g |
| `GET · POST` | `/api/steps` | Read / upsert daily steps |
| `GET · POST` | `/api/weight` | Weight history / upsert daily bodyweight |
| `GET` | `/api/insights` | Logging streak + 7-day goal adherence |
| `GET · PATCH` | `/api/profile` | Read / update per-user goals |
| `POST` | `/api/onboarding` | TDEE calc + rule-based plan gen + save UserPlan |
| `GET · POST` | `/api/plan` | Fetch / regenerate UserPlan |
| `GET · POST` | `/api/lifts` | List lift history / log a new entry |
| `DELETE` | `/api/lifts/[id]` | Delete a lift entry |
| `GET` | `/api/lifts/targets` | Progressive overload targets for today's workout |
| `POST` | `/api/webhooks/clerk` | Svix-verified Clerk user sync (no auth) |

---

## Project Structure

```
src/
├── proxy.ts                  Clerk middleware (Next.js 16 uses proxy.ts)
├── app/
│   ├── api/                  Route handlers
│   │   ├── dashboard/        stats · weekly
│   │   ├── food/             log · search · favorites · recent
│   │   ├── lifts/            route · [id] · targets
│   │   ├── onboarding/       TDEE + plan generation
│   │   ├── plan/             fetch / regenerate UserPlan
│   │   ├── profile/          goals CRUD
│   │   ├── steps/            daily steps
│   │   ├── weight/           bodyweight log
│   │   ├── insights/         streak + adherence
│   │   └── webhooks/clerk/   Svix user sync
│   ├── onboarding/           5-step wizard
│   ├── training/             workout plan + lift logger
│   ├── meals/                meal plan viewer
│   ├── food/                 food logger
│   ├── steps/                step tracker
│   ├── weight/               bodyweight tracker
│   ├── report/               weekly report
│   ├── settings/             goal editor
│   ├── layout.tsx            ClerkProvider + LayoutWrapper
│   └── globals.css           Frosted-glass dark design system
├── components/               Dashboard · Sidebar · MobileNav · Drawer · LandingPage
└── lib/
    ├── db.ts                 Prisma singleton + Neon retry logic
    ├── auth.ts               requireUser() — Clerk auth() helper
    ├── tdee.ts               Mifflin-St Jeor TDEE + macro targets
    ├── planGenerator.ts      Rule-based meal + workout plan (synchronous)
    ├── day.ts                Local day-start helpers (TZ-correct)
    ├── motion.ts             Shared Framer Motion variants
    ├── nav.ts                ALL_NAV / PRIMARY_NAV
    └── validation.ts         Zod request schemas
prisma/
├── schema.prisma             Models
├── migrations/               SQL migration history
└── generated/                Committed Prisma client
```

---

<div align="center">

Built with SwastikFit

</div>
