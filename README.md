<div align="center">

# 🟢 SwastikFit

### Fat Loss Command Center

A personal fitness tracker for logging **food, macros, and daily steps** against
**editable goals** — with GitHub auth, a cached nutrition search, and a weekly performance report.

<br/>

![Next.js](https://img.shields.io/badge/Next.js_16-09090b?style=for-the-badge&logo=next.js&logoColor=c8f542)
![React](https://img.shields.io/badge/React_19-09090b?style=for-the-badge&logo=react&logoColor=22d3ee)
![TypeScript](https://img.shields.io/badge/TypeScript-09090b?style=for-the-badge&logo=typescript&logoColor=3178c6)
![Prisma](https://img.shields.io/badge/Prisma_7-09090b?style=for-the-badge&logo=prisma&logoColor=fafafa)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-09090b?style=for-the-badge&logo=postgresql&logoColor=4169e1)

![NextAuth](https://img.shields.io/badge/NextAuth.js-09090b?style=for-the-badge&logo=auth0&logoColor=a855f7)
![Zod](https://img.shields.io/badge/Zod-09090b?style=for-the-badge&logo=zod&logoColor=3068b7)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-09090b?style=for-the-badge&logo=framer&logoColor=fbbf24)
![Edamam](https://img.shields.io/badge/Edamam_API-09090b?style=for-the-badge&logo=uber-eats&logoColor=c8f542)

</div>

---

## 📸 Screenshots

<div align="center">

### Food Logger
<img src="docs/screenshots/food-logger.png" alt="Food Logger — search foods and track macros by meal" width="850"/>

</div>

> [!NOTE]
> The Dashboard, Settings, and Weekly Report screens are behind GitHub sign-in.
> To showcase them, sign in and drop screenshots into `docs/screenshots/` using these names —
> they'll render automatically here:
> `dashboard.png` · `settings.png` · `weekly-report.png` · `step-tracker.png`

---

## ✨ Features

| | Feature | Description |
|---|---|---|
| 🔐 | **GitHub sign-in** | Database-backed sessions via NextAuth + Prisma adapter |
| 🍎 | **Food logging** | Search foods (Edamam) and log by meal — Breakfast / Lunch / Snack / Dinner |
| ⚡ | **Cached nutrition** | Results cached in Postgres with a 30-day TTL to cut API calls |
| 👟 | **Step tracking** | One entry per day, enforced by an upsert on `(userId, date)` |
| 📊 | **Dashboard** | Live macro progress bars and an animated step-goal ring |
| 📈 | **Weekly report** | 7-day calorie, protein, and step trends with a summary table |
| 🎯 | **Editable goals** | Per-user calorie / macro / step targets, set on the Settings page |
| 🌗 | **Timezone-correct** | "Today" is computed from the client's local day, consistently everywhere |

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router, Turbopack) · React 19 |
| **Language** | TypeScript (strict) |
| **Auth** | NextAuth v4 + `@auth/prisma-adapter` (GitHub OAuth) |
| **Database** | PostgreSQL via Prisma 7 (`@prisma/adapter-pg` connection pool) |
| **Validation** | Zod (request schemas) |
| **UI / Motion** | Framer Motion · lucide-react · CSS variables (custom neon dark theme) |
| **External API** | Edamam Food Database (nutrition lookup) |

---

## 🏗️ Architecture

```mermaid
flowchart LR
    Browser["🌐 Browser<br/>(client pages)"]

    subgraph Next["▲ Next.js 16 — App Router"]
        Pages["Client Components<br/>Dashboard · Food · Steps · Report · Settings"]
        API["Route Handlers<br/>/api/*"]
        Auth["requireUser()<br/>+ NextAuth session"]
    end

    Prisma["Prisma 7<br/>(pg pool adapter)"]
    DB[("🐘 PostgreSQL")]
    Edamam["🍎 Edamam<br/>Food API"]
    GitHub["🐙 GitHub OAuth"]

    Browser <-->|fetch JSON| API
    Browser --> Pages
    API --> Auth
    Auth --> GitHub
    API --> Prisma
    Prisma --> DB
    API -.->|cache miss / stale| Edamam
```

---

## 🗃️ Data Model

```mermaid
erDiagram
    User ||--o{ Account : has
    User ||--o{ Session : has
    User ||--o{ FoodLog : logs
    User ||--o{ StepLog : logs

    User {
        string id PK
        string email UK
        string name
        int calGoal "default 2350"
        int protGoal "default 160"
        int carbGoal "default 245"
        int fatGoal "default 65"
        int stepGoal "default 8000"
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
        string mealType "Breakfast|Lunch|Snack|Dinner"
        datetime date
    }
    StepLog {
        string id PK
        string userId FK
        int count
        datetime date "1 row per user per day"
    }
    FoodCache {
        string id PK
        string query UK
        string data "serialized Edamam results"
        datetime createdAt "TTL anchor (30d)"
    }
```

---

## 🔄 Request Flow — Food Search with Cache

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant P as Food Page
    participant API as /api/food/search
    participant C as FoodCache (Postgres)
    participant E as Edamam API

    U->>P: type "apple" + search
    P->>API: GET ?q=apple
    API->>C: findUnique(query)
    alt fresh hit (< 30 days)
        C-->>API: cached results
    else miss or stale
        API->>E: fetch nutrition
        E-->>API: hints[]
        API->>C: upsert(query, data, createdAt)
    end
    API-->>P: foods[] (top 10)
    P-->>U: render results
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in the project root:

```bash
# Database (PostgreSQL connection string)
DATABASE_URL="postgresql://user:password@host:5432/dbname"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="<run: openssl rand -base64 32>"

# GitHub OAuth app — https://github.com/settings/developers
GITHUB_ID="..."
GITHUB_SECRET="..."

# Edamam Food Database — https://developer.edamam.com
EDAMAM_APP_ID="..."
EDAMAM_APP_KEY="..."
```

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Run the dev server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint with ESLint |

---

## 🛰️ API Reference

All `/api` routes (except `food/search`) require an authenticated session.

| Method | Route | Purpose |
|--------|-------|---------|
| `GET` | `/api/dashboard/stats` | Today's macro totals, steps, and the user's goals |
| `GET` | `/api/dashboard/weekly` | 7-day aggregated trends |
| `GET` · `POST` · `DELETE` | `/api/food/log` | List / add / delete food log entries |
| `GET` | `/api/food/search?q=` | Search foods (cached → Edamam) |
| `GET` · `POST` | `/api/steps` | Read / upsert today's step count |
| `GET` · `PATCH` | `/api/profile` | Read / update per-user goals |
| `*` | `/api/auth/[...nextauth]` | NextAuth handlers |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── api/            # Route handlers (REST-style endpoints)
│   ├── (pages)/        # Dashboard, Food, Steps, Report, Settings, …
│   ├── layout.tsx      # Fonts + AuthProvider + LayoutWrapper
│   └── globals.css     # Neon dark theme (CSS variables)
├── components/         # Dashboard, Sidebar, MobileNav, providers
├── lib/
│   ├── db.ts           # Prisma singleton (pg pool)
│   ├── auth.ts         # NextAuth config + requireUser() helper
│   ├── day.ts          # Shared local-day boundary helpers
│   └── validation.ts   # Zod request schemas
└── types/
    └── next-auth.d.ts  # Session.user.id augmentation
prisma/
├── schema.prisma       # Models
└── migrations/         # SQL migration history
```

---

<div align="center">

Built with ☕ and 🟢 — **SwastikFit**

</div>
