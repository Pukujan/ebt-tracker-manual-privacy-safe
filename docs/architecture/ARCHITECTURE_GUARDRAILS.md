# Architecture Guardrails

## Module contract

Each backend module must export `register(app, context)` from:

- `backend/src/modules/<module-name>/index.js`

Each frontend module must default-export route metadata from:

- `frontend/src/modules/<module-name>/index.jsx`

## Boundaries

- Module code may import from its own folder.
- Module code may import from `src/shared/*`.
- Module code may import external packages.
- Module code must not import from other module folders.

## Naming

- Use kebab-case module folder names.
- API base route should match module name: `/api/<module-name>`.
- Frontend route should usually match module name: `/<module-name>`.
