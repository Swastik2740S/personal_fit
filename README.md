# SwastikFit — Fat Loss Command Center

A personal fitness tracker for logging food, macros, and daily steps against editable goals.
Built with **Next.js 16** (App Router) + **React 19**, **Prisma 7 / PostgreSQL**, and
**NextAuth** (GitHub OAuth). Food nutrition data comes from the **Edamam** food database
(cached locally to reduce API calls).

## Features

- GitHub sign-in (database-backed sessions)
- Food search + logging by meal (Breakfast / Lunch / Snack / Dinner)
- Daily step tracking (one entry per day)
- Dashboard with macro progress and a step-goal ring
- 7-day weekly report
- Editable per-user goals (calories, protein, carbs, fat, steps) on the **Settings** page

## Tech stack

| Concern    | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router), React 19 |
| Auth       | NextAuth v4 + `@auth/prisma-adapter` (GitHub) |
| Database   | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Validation | zod |
| UI         | Framer Motion, lucide-react, CSS variables |
| Food data  | Edamam Food Database API |

## Getting started

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

# GitHub OAuth app (https://github.com/settings/developers)
GITHUB_ID="..."
GITHUB_SECRET="..."

# Edamam Food Database (https://developer.edamam.com)
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

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start the dev server     |
| `npm run build` | Production build         |
| `npm start`     | Run the production build  |
| `npm run lint`  | Lint with ESLint         |

## Project structure

```
src/
├── app/            # routes (pages + /api route handlers)
├── components/     # Dashboard, Sidebar, nav, providers
├── lib/            # db, auth (+requireUser), day helpers, zod schemas
└── types/          # NextAuth type augmentation
prisma/             # schema + migrations
```
