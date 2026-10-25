# Car Doctor

Car maintenance tracker: users manage their cars and each car's service history.
Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS 4 · shadcn (Base UI) ·
Supabase Auth · PostgreSQL (Supabase) via Drizzle · deployed on Vercel.

@AGENTS.md

## Commands

- `npm run dev`: dev server (the user runs it on their Mac, port 3000)
- `npx tsc --noEmit` and `npm run lint`: run both after every change; there is no test suite
- `npm run db:push`: apply `drizzle/schema.ts` to the database (no migrations folder; push workflow)
- `npm run db:studio`: browse the database
- Pre-commit hook runs `eslint --fix` (lint-staged) and `gitleaks`

## Project layout

- `app/page.tsx`: public home page (full width, renders Nav/Footer itself)
- `app/(app)/`: signed-in pages (`cars`, `admin`, `profile`, `reminders`); its layout provides Nav, Footer and the page container
- `lib/reminders.ts`: `getReminders(userId, now)` — maintenance due soon/overdue across all of a user's cars (built on `getMaintenanceSuggestions`), used by `/reminders` and the nav bell (`components/reminder-bell.tsx`)
- `app/(auth)/`: sign in / sign up / password reset; `app/auth/confirm`: Supabase email callback
- `proxy.ts`: route protection (Next 16's replacement for middleware)
- `lib/actions/`: server actions · `lib/queries.ts`: reads · `lib/session.ts`: `getCurrentUser` / `requireUser` / `requireAdmin`
- `drizzle/schema.ts`: database schema · `lib/db.ts`: Drizzle client
- `lib/maintenance-suggestions.ts`: `MaintenanceSuggestion` type, `getMaintenanceSuggestions(car, records, now)` (returns sample data for now; to be generated from maintenance history and mileage) and `isDueSoon` / `isOverdue` (due within `DUE_SOON_MONTHS` = highlighted in red). Shown on `/cars/[id]`; editing lives at `/cars/[id]/edit`
- `components/ui/`: shadcn components · `components/`: app components (`PageHeader`, `ActionForm`, `SubmitButton`, …)
- `components/ai-elements/`: AI Elements (Vercel's shadcn-based chat components; patched for Base UI, see comments) · `components/chat/`: floating AI chat (`ChatWidget`, rendered on the home and car pages only); `app/api/chat/route.ts` streams replies from Gemini (`lib/ai.ts`) via `useChat`

## Conventions

- **Ask before installing** any package or shadcn component (`npm install`, `npx shadcn add`).
- **Prefer what exists**: use a shadcn or Next.js component when one exists instead of hand-writing it. Customizing an installed shadcn component is fine.
- **Server actions must authorize**: call `requireUser()` and scope every query to the user (`eq(cars.userId, user.id)` or `assertCarOwnership`). Bound arguments (`action.bind(null, id)`) come back from the client and can be tampered with.
- Pages are Server Components that `await` data inside a `<Suspense>` boundary; keep `"use client"` to the smallest leaf that needs it.
- Forms: `ActionForm` (runs the action, shows a Sonner toast, optional `redirectTo`) with `SubmitButton` inside. Don't `redirect()` from actions used by `ActionForm`.
- **Single responsibility**: one component does one thing. When a component starts handling two concerns (e.g. owning state *and* rendering a list), split it — the parent keeps the state, the child takes it as props (see `CarsView` / `ViewModeSwitcher`).

## Database

- `DATABASE_URL` is Supabase's transaction pooler (port 6543), so the app client uses `prepare: false`.
- drizzle-kit uses `DIRECT_URL` (session pooler, port 5432); the transaction pooler breaks schema introspection.
- Foreign keys cascade on delete (`cars` → `maintenance_records`).
