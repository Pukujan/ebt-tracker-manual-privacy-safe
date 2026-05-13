# Modular litigation starter pack

This repository is a **modular monolith starter**: a small Express backend and Vite + React frontend with **no business modules** out of the box. You add features as self-contained modules under `backend/src/modules/` and `frontend/src/modules/` without rewriting application core.

The goal is to grow a litigation workflow application safely: each module owns its HTTP surface and UI route, while **shared** code lives under `src/shared/` on each side.

## Canonical remote

Source of truth for this codebase:

- [https://github.com/Pukujan/ebt-tracker-manual-privacy-safe](https://github.com/Pukujan/ebt-tracker-manual-privacy-safe)

Clone with:

```bash
git clone https://github.com/Pukujan/ebt-tracker-manual-privacy-safe.git
```

## What is included

| Piece | Role |
| --- | --- |
| `backend/src/core/module-loader.js` | Scans `backend/src/modules/*/index.js`, imports each, calls `register(app, context)` when present |
| `backend/src/core/server.js` | Express app shell; loads modules at startup |
| `frontend/src/core/moduleRegistry.jsx` | Eager `import.meta.glob` over `../modules/*/index.jsx`; builds the route list for the shell UI |
| `frontend/src/core/App.jsx` | Renders discovered module routes and navigation |
| `backend/src/shared/*`, `frontend/src/shared/*` | Cross-cutting helpers (HTTP errors, API client, events, and so on) |
| `scripts/new-module.mjs` | Creates a matching backend + frontend module skeleton with correct naming |
| `backend/scripts/check-module-boundaries.mjs` | CI-friendly check that backend module code does not reference other modules’ paths |
| `docs/architecture/ARCHITECTURE_GUARDRAILS.md` | Human-readable module contract and boundary rules |

Guardrails are both **documented** and **partially automated** (boundary script + loaders that only accept the agreed entrypoints). See [Architecture guardrails](./architecture/ARCHITECTURE_GUARDRAILS.md) for the full picture.

## Repository layout

```text
├── backend/src/core/          # server bootstrap, module loader
├── backend/src/modules/       # feature modules (empty except .gitkeep until you scaffold)
├── backend/src/shared/        # allowed shared imports for modules
├── frontend/src/core/         # app shell, module registry
├── frontend/src/modules/      # feature UI modules
├── frontend/src/shared/
├── docs/                      # this documentation
└── scripts/new-module.mjs     # module scaffolder
```

## Run locally

Install and start backend and frontend (from repo root):

```bash
cd backend && npm install && npm run dev
```

In another terminal:

```bash
cd frontend && npm install && npm run dev
```

Root `package.json` also exposes `npm run dev:backend` and `npm run dev:frontend`.

## Environment variables (backend)

Create `backend/.env` (gitignored). A committed template lives at [`backend/.env.example`](../backend/.env.example).

This repo keeps only the **API essentials** you asked for:

- **`POSTGRES_URL`** — Neon Postgres connection string  
- **`OPENROUTER_API_KEY`** and **`LLM_BASE_URL`** — OpenRouter (`https://openrouter.ai/api/v1` by default)  
- **`PORT`** — HTTP port for the Express server (defaults to `3001` if unset)

The starter server currently reads **`PORT`** only; Neon and OpenRouter variables are ready for modules and shared code you add next.

## Create a module

From the repository root:

```bash
node scripts/new-module.mjs <kebab-case-name> --label "Readable name"
```

Example:

```bash
node scripts/new-module.mjs intake-triage --label "Intake Triage"
```

Equivalent:

```bash
npm run new:module -- intake-triage --label "Intake Triage"
```

Restart the backend and refresh the frontend so the new route and API mount are picked up.

## Check module boundaries

Before opening a pull request or in CI:

```bash
npm run lint:boundaries
```

This runs the backend boundary script and fails if any backend module file contains an import path into another module’s folder. Details are in [Architecture guardrails](./architecture/ARCHITECTURE_GUARDRAILS.md).
