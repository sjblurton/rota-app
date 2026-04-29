# API Folder Agent Guide

## Purpose

This folder contains all API resource modules for the backend. Each resource (e.g., invites, organisations) is structured as its own subfolder, following a clear separation of concerns.

## Structure

- Each resource module is a folder: `{module-name}/`
- Inside each module folder:
  - `controllers/` — Request handler logic (no direct DB access, calls services/repositories)
  - `routes/` — Express routers for this resource (mount controllers, no business logic)
  - `docs/` — OpenAPI or endpoint documentation for this resource
- No business logic, DB access, or service code should be placed directly in this folder or in routers/controllers. Only call out to services/repositories/utilities.

## Naming

- Use explicit file names: `post-invites-controller.ts`, `invites-router.ts`, `openapi.ts`, etc.
- Do not use `index.ts` barrel files.

## Agent Instructions

- When editing or adding to this folder, always:
  1. Place new resources in their own `{module-name}/` folder.
  2. Keep controllers, routers, and docs separated as above.
  3. Follow the conventions in this file for naming and structure.
  4. Do not add business logic or DB code here—call src/services or src/repositories instead.

## Example

```text
api/
  invites/
    controllers/
      post-invites-controller.ts
      patch-invites-controller.ts
    routes/
      invites-router.ts
    docs/
      openapi.ts
  organisations/
    controllers/
    routes/
    docs/
```

## Controller Guidelines

- Controllers are responsible for:
  - Receiving validated request data (params, body, query).
  - Orchestrating the request: calling services, repositories, and utilities.
  - Handling errors and sending HTTP responses.
- Controllers must NOT:
  - Contain business logic or direct DB access.
  - Import or use Prisma directly.
  - Perform validation (except for calling a shared validation utility).
- Always import validation schemas from `src/libs/schemas/` and validate at the controller boundary.

## Router Guidelines

- Routers:
  - Define HTTP routes and mount controllers.
  - Do not contain business logic, validation, or DB access.
  - Only import controllers (never services or repositories).
  - Use explicit paths, no `index.ts` barrels.
- Mount routers in the main app or role-based routers as appropriate.

## Docs Guidelines

- Docs:
  - Contain OpenAPI documentation for the resource.
  - Reference zod schemas imported from `src/libs/schemas/` for request/response bodies.
  - Only define documentation-specific schemas locally if not reusable elsewhere.
  - Keep documentation up to date with actual routes and controllers.

## Zod Schema Usage

- All reusable validation and domain schemas must be defined in `src/libs/schemas/`.
- Import these schemas in both controllers (for validation) and docs (for OpenAPI).
- Do not duplicate schema definitions in feature docs except for documentation-only fields.

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
