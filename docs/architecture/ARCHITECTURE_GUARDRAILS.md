# Architecture guardrails

This document is the **contract** for feature modules and describes how the starter **enforces or encourages** that contract.

## Module contract

### Backend

Each backend module must export `register(app, context)` from:

- `backend/src/modules/<module-name>/index.js`

The loader (`backend/src/core/module-loader.js`) only loads directories under `backend/src/modules/` that contain `index.js`. Directories whose names start with `_` or `.` are skipped.

`context` currently includes `eventBus` (from `backend/src/shared/events/index.js`). Modules may emit or subscribe through it without importing another module’s code.

### Frontend

Each frontend module must provide a **default export** that the registry can turn into a route record. The shape expected by `frontend/src/core/moduleRegistry.jsx` is:

- `route` — string path (for example `"/intake-triage"`)
- `label` — short string for the nav menu
- `Component` — React component rendered at that route

The entry file must live at:

- `frontend/src/modules/<module-name>/index.jsx`

Discovery uses Vite’s `import.meta.glob("../modules/*/index.jsx", { eager: true })`. Any file that does not export a default with `route`, `label`, and `Component` is ignored.

## Boundaries (design rules)

- Module code may import from **its own** folder under `modules/<name>/`.
- Module code may import from **`src/shared/*`** on the same app (backend or frontend).
- Module code may import **external npm packages**.
- Module code **must not** import from **other** module folders (`modules/<other-name>/`).

These rules keep modules replaceable and reduce hidden coupling as the litigation workflow grows.

## Naming

- Use **kebab-case** module folder names (enforced by `scripts/new-module.mjs` for new modules).
- Prefer API base path aligned with the folder name: `/api/<module-name>`.
- Prefer frontend route aligned with the folder name: `/<module-name>`.

The scaffolder wires `/api/<module-name>` and `/<module-name>` by default.

## How guardrails are applied

| Mechanism | What it does |
| --- | --- |
| **Module loader** | Only `register` from `index.js` is used; missing or invalid modules are skipped or logged. |
| **Module registry** | Only well-shaped default exports become routes; incomplete modules do not appear in the menu. |
| **Boundary script** | `backend/scripts/check-module-boundaries.mjs` (via `npm run lint:boundaries`) scans `.js` and `.mjs` under each backend module for the substring `/modules/<other>/` and exits with an error if any cross-module path appears. |
| **This document** | Single place for reviewers and contributors to align on contracts and naming. |

### Boundary script scope (important)

The checker runs on **backend** module trees only and detects **literal path strings** of the form `/modules/<other>/`. It does not analyze TypeScript or frontend JSX imports today. Teams should still follow the same boundary rules on the frontend and treat cross-module imports as a design violation even when the script does not flag them.

## Related files

- `backend/src/core/module-loader.js` — backend registration
- `frontend/src/core/moduleRegistry.jsx` — frontend route discovery
- `scripts/new-module.mjs` — paired module skeleton
- `backend/scripts/check-module-boundaries.mjs` — automated backend boundary check

For a high-level overview of the starter, see [Starter pack](../STARTER_PACK.md).
