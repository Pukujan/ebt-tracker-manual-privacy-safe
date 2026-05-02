# Modular Litigation Starter

A clean starter repo using the same modular-monolith architecture pattern as your current system, but with **zero business modules**.

You can add new modules safely without rewriting app core.

## What is included

- Backend module auto-loader (`backend/src/core/module-loader.js`)
- Frontend module auto-discovery with route menu (`frontend/src/core/App.jsx`)
- Shared architecture guardrails
- Module boundary lint script
- New module scaffolder (`scripts/new-module.mjs`)

## Repo structure

```text
modular-litigation-starter/
├── backend/
│   ├── src/
│   │   ├── core/
│   │   ├── shared/
│   │   └── modules/
│   └── scripts/
├── frontend/
│   └── src/
│       ├── core/
│       ├── shared/
│       └── modules/
├── docs/architecture/
└── scripts/
```

## Run locally

### 1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 2) Start backend

```bash
cd backend
npm run dev
```

### 3) Start frontend

```bash
cd frontend
npm run dev
```

## Create your first module

From repo root:

```bash
node scripts/new-module.mjs intake-triage --label "Intake Triage"
```

This creates:

- `backend/src/modules/intake-triage/index.js`
- `frontend/src/modules/intake-triage/index.jsx`

Then restart backend and refresh frontend.
