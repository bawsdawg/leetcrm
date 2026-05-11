# Project layout overview

This repo is a Next.js (App Router) SaaS scaffold aligned with `DESIGN.md` and the Vercel React best-practices skill under `.agents/skills/vercel-react-best-practices/`.

## Route map

| URL | Location | Purpose |
|-----|----------|---------|
| `/` | `app/(marketing)/page.js` | Landing (public) |
| `/privacy`, `/terms` | `app/(marketing)/privacy`, `terms` | Legal / marketing |
| `/login` | `app/(auth)/login` | Google SSO (workspace @searchmind.dk) |
| `/sign-up` | `app/(auth)/sign-up` | Redirects to `/login` (sign-up hidden for now) |
| `/dashboard`, `/settings` | `app/(dashboard)/dashboard`, `settings` | App shell (JWT session + middleware enforced) |
| `/api/auth/*` | `app/api/auth/[...nextauth]/route.js` | Auth.js OAuth callbacks |
| `/api/health` | `app/api/health/route.js` | Uptime / probes |
| `/api/webhooks/stripe` | `app/api/webhooks/stripe/route.js` | Stripe webhooks |
| `/api/cron` | `app/api/cron/route.js` | Scheduled jobs (e.g. Vercel Cron) |

## Folder structure

| Path | Role |
|------|------|
| `app/(marketing)/` | Public marketing pages (route group, no URL segment) |
| `app/(auth)/` | Login layouts and pages (workspace Google SSO; `/sign-up` redirects) |
| `app/(dashboard)/` | Authenticated app chrome (sidebar + nested routes) |
| `app/api/` | Route handlers (REST, webhooks, cron) |
| `actions/` | Server Actions (`"use server"`) — auth, billing stubs |
| `components/ui/` | Primitives (buttons, inputs) |
| `components/layout/` | Shared shells — `site-header`, `auth-card`, etc. |
| `components/settings/` | Preferences (e.g. layout density · DESIGN §10) |
| `components/providers/` | Client root providers (`AppProviders`) |
| `components/features/` | Domain-specific UI (fill as you build) |
| `components/emails/` | Email templates (e.g. React Email) |
| `lib/` | `utils`, `env`, `rate-limit`, `auth/`, `db/`, `email/`, `stripe/`, `validators/` |
| `config/` | `routes.js` (canonical paths), `site.js` (name, metadata helpers) |
| `constants/` | Re-exports shared config |
| `db/` | ORM schema / migrations when you add a database |
| `hooks/` | Client hooks (e.g. `use-mounted.js`) |
| `tests/e2e/` | End-to-end tests (optional) |
| `public/` | Static assets |
| `middleware.js` | Matcher for `/dashboard/*` and `/settings/*` — extend with auth |

## Conventions

- **Paths:** import from `@/config/routes` instead of hard-coded strings.
- **`lib/env.js`:** central `process.env` access; extend with Zod or `@t3-oss/env-nextjs` in production.
- **Global nav:** `components/layout/site-header.js` (and `site-nav.js`) are included from `app/layout.js`, so every UI route shows the same sticky header. API routes (`/api/*`) are not pages and do not render this layout.
- **`DESIGN.md`:** consolidated Resend backbone (§1–§9) + Searchmind Agency OS complement (§10). Implementation details:
  - **Tokens:** semantic colors in `app/globals.css` (`bg-canvas`, `text-fg`, `border-border`, …); avoid raw `#` / `rgba` in JSX for surfaces/text/borders.
  - **Density:** `[data-density="compact"|"spacious"]` controls `--ds-studio-*` for dashboard `<main>`; preference at **Settings** (`apex-density` in `localStorage`), inline init in root layout alongside theme.
  - **Shell metrics:** `--ds-sidebar-w` (**220px**), header row **52px**, studio padding via `shellMainStudio` (`config/shell.js`).
  - **Typography:** Fraunces (display serif stand-in), Inter (UI); JetBrains Mono for `code`/tabular data patterns; **`nav-tracking`** (+0.35px on main nav pills per DESIGN §3).

## Dependencies (relevant)

- `clsx`, `tailwind-merge` — `lib/utils.js` helper `cn()` for class names.
