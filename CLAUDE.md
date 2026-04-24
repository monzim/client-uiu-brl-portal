# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 3000
npm run build      # Production build (Nitro-bundled output at .output/)
npm run preview    # Preview production build locally
npm run test       # Run all tests (Vitest)
npm run lint       # ESLint check
npm run check      # Prettier fix + ESLint fix (combined)
npm run format     # Prettier check only

# Run single test file
npx vitest run src/path/to/file.test.ts

# Database (after Prisma is set up)
npx prisma migrate dev --name <name>
npx prisma db seed
npx prisma studio
```

## Architecture

**Stack:** TanStack Start (React 19 + Nitro server) + Vite. File-based routing via `@tanstack/react-router`. SSR with hydration.

**Runtime:** Nitro bundles both the React SSR renderer and API routes into `.output/server/index.mjs`. In production the Docker container runs this single Node process.

**Path aliases:** Both `@/*` and `#/*` resolve to `./src/*`. Use `#/` for server-side code (Nitro is fine with it), `@/` for isomorphic or client code.

### Routing

All routes live in `src/routes/`. File naming conventions:
- `__root.tsx` — root layout; `useRouterState` skips Navbar/Footer on `/admin/*`
- `index.tsx` — `/`
- `news.tsx` / `news.index.tsx` / `news.$newsId.tsx` — layout + index + dynamic segment
- `admin.tsx` — admin layout route with `beforeLoad` auth guard
- Dots in filenames = path nesting without new directory

Route files use `createFileRoute('/path')({...})`. The route tree is auto-generated into `src/routeTree.gen.ts` — never edit this manually. Re-generate by starting `npm run dev` briefly.

**Data loading pattern:** Loaders run server-side on first load and client-side on navigation. Use `Route.useLoaderData()` inside the component. Server-only logic (DB, cache) belongs in `createServerFn` wrappers in `src/server/`.

**`createServerFn` with parameters:** TanStack Start's type system doesn't support typed `data` parameters in this version — use `(ctx: { data: T })` with `// @ts-expect-error` at both the handler definition and each call site.

### API Routes (Nitro)

HTTP API routes live in `server/api/` (Nitro file-based routing, NOT in `src/routes/`):
- `server/api/auth/login.ts` → `POST /api/auth/login`
- `server/api/news/index.ts` → `GET/POST /api/news`
- `server/api/news/[id].ts` → `GET/PUT/DELETE /api/news/:id`
- `server/api/news/admin.ts` → `GET /api/news/admin` (auth required, includes drafts)
- Same pattern for `faculty/`
- `server/api/upload.ts` → `POST /api/upload`

Use H3 helpers (`defineEventHandler`, `readBody`, `getCookie`, etc.) in server handlers. Auth via `#/lib/requireAuth`. Nitro plugins in `server/plugins/`.

### Data Layer

News and Faculty data served from Postgres via Prisma 7 (`prisma/schema.prisma`). Other sections (projects, equipment, partnerships, awards) remain static in `src/data/`.

- `src/lib/db.ts` — Prisma singleton using `@prisma/adapter-pg`
- `src/lib/redis.ts` — Redis singleton with `cached(key, ttl, fetcher)` helper
- `src/lib/storage.ts` — MinIO client with `uploadFile` / `deleteFile` / `ensureBucket`
- `src/lib/auth.ts` — JWT sign/verify (1h expiry), cookie name `brl_admin_token`
- `src/lib/requireAuth.ts` — H3 middleware that throws 401 if no valid token
- `src/server/news.ts` / `src/server/faculty.ts` — `createServerFn` wrappers for public reads (cached)
- `src/server/auth.ts` — `checkAdminAuth` server fn reads cookie from SSR request

**Prisma 7 note:** `url` removed from `schema.prisma`; connection string passed via `PrismaPg` adapter in `db.ts`. Migrations need `--url` flag or use `DATABASE_URL` env.

### Styling

Tailwind CSS v4. Theme tokens defined in `src/styles.css`:
- `--color-brand-bg: #f2f5f2`
- `--color-brand-accent: #2a4d3f`
- `--color-brand-text: #0e1f1a`
- `--font-sans: "Plus Jakarta Sans", "Inter"`

Use `cn()` from `src/lib/utils.ts` (clsx + tailwind-merge) for conditional class composition.

### Component Conventions

- Radix UI primitives for accessible interactive elements (dialog, navigation-menu, avatar)
- `class-variance-authority` (CVA) for variant-based component APIs
- Lucide icons via `lucide-react`

### __root.tsx Shell

`RootDocument` renders Navbar + Footer around every route. Admin panel routes (under `/admin`) must suppress these — check `useRouterState` for the current pathname or use a separate layout route that does not inherit from root shell.

## Deployment

Woodpecker CI (`/.woodpecker.yml`):
1. PR to main → Docker build dry-run
2. Merge to main → build + push to `ghcr.io/monzim/client-uiu-brl-portal/web:latest`
3. SSH deploy: `docker compose pull && down && up -d` at remote path

Production compose (`compose.yml`) connects to external `center-network` (Traefik). Domain: `brl.client.monzim.com`.

Local dev compose (`docker-compose.yml`) runs the app + supporting services (Postgres, Redis, MinIO) on a single host.

## Prettier Config

No semicolons, single quotes, trailing commas. Enforced via `npm run check`.
