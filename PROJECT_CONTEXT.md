# PROJECT_CONTEXT.md

> **Purpose:** Curated, always-current context for this codebase so an agent can get up to
> speed from THIS file instead of re-exploring. Auto-loaded via `CLAUDE.md`.
> **Maintenance:** Keep this updated whenever code/architecture/conventions change. Prefer
> editing the relevant section over appending. Convert relative dates to absolute.

---

## 1. What this is
**SwastikFit — "Fat Loss Command Center."** A personal fitness tracker: log food + macros and
daily steps against **editable per-user goals**, with GitHub auth, a cached nutrition search,
a dashboard, a 7-day report, and static coaching/training/meal/supplement content pages.
(Repo folder is named "Personal trainer"; the product is SwastikFit.)

## 2. Stack
- **Next.js 16.2.6** (App Router, Turbopack) · **React 19.2.4** · TypeScript (strict)
- **NextAuth v4** + `@auth/prisma-adapter` (GitHub OAuth, **database sessions**)
- **Prisma 7.8** + PostgreSQL via `@prisma/adapter-pg` (pg Pool). DB is **Neon serverless**
  (auto-suspends → first connect may fail `P1001`; just retry).
- **zod 4** (request validation) · **framer-motion 12** · **lucide-react 1.16** · plain CSS
  (CSS variables) — no Tailwind.

## 3. Commands & env
- `npm run dev` | `npm run build` | `npm start` | `npm run lint`
- `npx prisma migrate dev` (apply/create) · `npx prisma migrate deploy` (apply only)
- Env: `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GITHUB_ID`, `GITHUB_SECRET`,
  `EDAMAM_APP_ID`, `EDAMAM_APP_KEY`.

## 4. Directory map (key files)
```
src/
├─ app/
│  ├─ api/
│  │  ├─ auth/[...nextauth]/route.ts   NextAuth handler
│  │  ├─ dashboard/stats/route.ts      today's totals + steps + user goals
│  │  ├─ dashboard/weekly/route.ts     7-day aggregation
│  │  ├─ food/log/route.ts             GET/POST/DELETE food entries
│  │  ├─ food/search/route.ts          Edamam search w/ FoodCache TTL (public)
│  │  ├─ steps/route.ts                GET / upsert today's steps
│  │  └─ profile/route.ts              GET/PATCH per-user goals
│  ├─ page.tsx                         session ? <Dashboard> : <LandingPage>
│  ├─ layout.tsx                       fonts + AuthProvider + LayoutWrapper
│  ├─ globals.css                      design system (glass, classes, breakpoints)
│  └─ {food,steps,report,settings,meals,training,supplements,tips}/page.tsx
├─ components/
│  ├─ LayoutWrapper.tsx   shell: Sidebar + MobileHeader + MobileNav + MotionConfig + page transition
│  ├─ Sidebar.tsx         desktop/tablet nav (consumes nav.ts)
│  ├─ MobileHeader.tsx    fixed mobile top bar + hamburger (opens Drawer)
│  ├─ Drawer.tsx          mobile slide-in nav (ALL pages + Logout)
│  ├─ MobileNav.tsx       mobile bottom bar (PRIMARY_NAV)
│  ├─ Dashboard.tsx · LandingPage.tsx · AuthProvider.tsx
└─ lib/
   ├─ db.ts          Prisma singleton (pg pool)
   ├─ auth.ts        authOptions + requireUser() helper
   ├─ day.ts         getLocalStartOfDay() / getDayStart(req)
   ├─ motion.ts      shared framer variants + useCountUp
   ├─ nav.ts         ALL_NAV / PRIMARY_NAV
   └─ validation.ts  zod schemas
src/types/next-auth.d.ts   augments session.user.id
prisma/schema.prisma + migrations/   (generated client committed under prisma/generated/)
```

## 5. Data model (Prisma)
- **NextAuth:** `Account`, `Session`, `User`, `VerificationToken`.
- `User` also has editable goal columns: `calGoal`(2350) `protGoal`(160) `carbGoal`(245)
  `fatGoal`(65) `stepGoal`(8000) — defaults mirror old hardcoded targets.
- `FoodLog` (userId, name, qty, cal/prot/carb/fat, mealType, date).
- `StepLog` (userId, count, date) — **one row per user per day** via `upsert` on
  `@@unique([userId, date])` with `date` normalized to day-start.
- `FoodCache` (query unique, data JSON, createdAt) — Edamam cache, **30-day TTL**.

## 6. Conventions / patterns (REUSE THESE)
- **Auth in API routes:** `const { userId, error } = await requireUser(); if (error) return error;`
  Then query by `userId`. **Do NOT** re-fetch the user by email — `session.user.id` is injected by
  the `auth.ts` session callback (typed via `src/types/next-auth.d.ts`).
- **"Today" boundaries:** always use `getDayStart(req)` (server) + send `?localStart=` from the
  client via `getLocalStartOfDay()` (in `day.ts`). Keeps dashboard/steps/food/weekly TZ-consistent.
- **Validation:** `schema.safeParse(await req.json())` with schemas from `validation.ts`; return 400
  on failure. Rejects NaN/negative numbers.
- **Animations:** import `{ containerStagger as container, fadeUpItem as item }` from `lib/motion.ts`
  (don't redefine variants per file). `useCountUp(n)` for animated numbers. Reduced-motion is handled
  globally by `<MotionConfig reducedMotion="user">` in LayoutWrapper + a CSS reduced-motion net.
- **Navigation:** edit `lib/nav.ts` only; Sidebar/Drawer use `ALL_NAV`, bottom bar uses `PRIMARY_NAV`.

## 7. Design system (globals.css) — "One UI × glass: dark, frosted, muted, pill-shaped"
- **Frosted glass (medium frost, dark):** `--surface-1: rgba(22,22,26,0.55)` (cards),
  `--surface-2: rgba(34,34,40,0.62)` (raised/metric/chips/tiles), `--surface-bar: rgba(14,14,17,0.72)`
  (sidebar/topbar/bottom-nav/drawer/**modal**), `--glass-blur: blur(28px) saturate(150%)` (always pair
  `-webkit-backdrop-filter`), `--glass-border` 0.12, `--shadow-glass`. Dark frost (not white tint) so
  content behind is obscured = **readable** (fixed the old see-through bug).
- **One UI shape language:** `--r-pill: 999px` on controls (`.btn .btn-ghost .search-input .qty-input
  .nav-item .day-tab .badge .stat-row .chip .hamburger`) + the mobile bottom-nav active pill; cards =
  big-rounded "focus blocks" `--r2:26` (`.card .metric-card .note-box .result-item .preview-macros`),
  `--r3:32` (`.modal .glass-panel`). Accent `--accent #c8f542` (glows muted ~0.22).
- **Blurred panels only at top level** (`.card .glass-panel .modal .sidebar .app-topbar
  .mobile-nav .drawer`); nested bits (`.metric-card .chip .icon-tile .search-input`) use solid
  surfaces (avoid stacked backdrop-filters → mobile GPU cost).
- **Reusable classes:** `.layout-aside` (1fr+340→stack@1024), `.auto-grid` (auto-fill 280px),
  `.feature-grid` (3→1@640), `.stack`/`.stack-lg`, `.icon-tile` (`--tile-size`/`--tile-color`),
  `.chip`/`.chip-row` (wraps), `.note-box`, `.stat-row`, `.spinner`.
- **Breakpoints:** 1200 / 1024 (sidebar→icon rail) / 768 (sidebar hidden, mobile chrome) / 480
  (modal→bottom sheet).
- **Accessibility:** `@media (prefers-reduced-motion)` + `(prefers-reduced-transparency)` fallbacks;
  `@supports not (backdrop-filter)` → solid panels.

## 8. API routes
| Method | Route | Auth | Purpose |
|---|---|---|---|
| GET | /api/dashboard/stats | yes | today's macros+steps+goals |
| GET | /api/dashboard/weekly | yes | 7-day trends |
| GET/POST/DELETE | /api/food/log | yes | list/add/delete entries |
| GET | /api/food/search?q= | no | cached Edamam search |
| GET/POST | /api/steps | yes | read / upsert today's steps |
| GET/PATCH | /api/profile | yes | read / update goals |

## 9. Gotchas
- **Next 16 differs from training data** (`AGENTS.md`): consult `node_modules/next/dist/docs/`
  before new Next patterns; follow existing repo patterns.
- **Prisma client is committed** under `prisma/generated/` in the flat `prisma-client-js` format.
  After editing `schema.prisma`, do a **clean** regen: `rm -rf prisma/generated && npx prisma generate`
  (partial regens leave stale split files → "no properties in common with UserSelect").
- **Meals page targets are still hardcoded** (2350 etc.) — not wired to per-user goals (future TODO).
- **Lint:** `next build` does NOT run eslint. Remaining `react-hooks/set-state-in-effect` errors are
  the pre-existing data-fetch-in-useEffect pattern across pages (accepted; not blocking).
- **Mobile screenshots:** headless Edge/Chrome CLI clamps small window widths (~875px min) → use
  puppeteer-core with device emulation (`isMobile`, viewport) for true phone widths. Viewport meta is
  present (Next auto-injects `width=device-width`).
- **No automated tests** exist yet.

## 10. Current state (as of 2026-06-07)
Branch `main`, clean. Shipped:
- **PR #7 "code fixes":** TZ consistency (`day.ts`), StepLog upsert, `requireUser` refactor (dropped
  redundant user lookups + `as any`), zod validation, FoodCache TTL, editable goals (User columns +
  `/api/profile` + `/settings`), README rewrite, prisma client regen.
- **PR #8 "ui fixes":** Apple-glass design system (dark, muted accents), full responsive overhaul,
  mobile top bar + drawer (`MobileHeader`/`Drawer`/`nav.ts`), shared motion (`motion.ts`) + count-up,
  modal bottom-sheet, fixed undefined `.spinner`, removed dead `page.module.css`, migrated inline
  styles → classes, fixed dead "Watch Demo" button + lint/unused-import cleanup.
- **One UI blend (uncommitted as of this update):** fixed glass see-through readability by switching
  to dark **medium frost** surfaces (was 4.5% white tint → now ~55-72% dark + blur 28px); adopted One
  UI **pill** shapes (`--r-pill`) across controls/inputs/chips/nav/badges + a sliding mobile bottom-nav
  pill, and big-rounded **focus-block** card radii (`--r2:26/--r3:32`). Mostly `globals.css` +
  `MobileNav.tsx`/`supplements`. (See §7.)

Verified: build green, lint unchanged, landing pills responsive at 390/1440 (device-emulated). **Not
yet visually verified by agent:** frosted cards / drawer / modal on authed pages (need a signed-in
session).

## 11. Known TODO / ideas
- Wire meals page targets to `/api/profile` goals.
- Add tests.
- Consider gitignoring `prisma/generated` (currently committed → noisy diffs on schema change).
- Optionally address the `set-state-in-effect` data-fetching pattern (would be a broader refactor).
