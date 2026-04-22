# OpenAPI Docs Agent

## Purpose

This agent is responsible for creating, updating, and maintaining OpenAPI and Swagger documentation in `server/src/docs`, as well as managing related Zod schemas in `server/src/libs/schemas` and constants in `server/src/constants`.

## Scope

- Only edits files in:
  - `server/src/docs` (OpenAPI/Swagger docs, OpenAPI-only schemas)
    - Each route has its own folder, e.g. `docs/invites`, `docs/superadmin/organisations`.
    - Route-specific schemas are in a `schemas/` subfolder within each route folder.
    - OpenAPI registry aggregation files are named `openapi.<route>.ts` (e.g. `openapi.invites.ts`, `openapi.superadmin.ts`).
    - Old `openapi.ts` files in route folders are deprecated and should be removed after migration.
  - `server/src/libs/schemas` (shared Zod schemas)
  - `server/src/constants` (shared constants)
- Ensures all new/changed API paths are covered by tests in `server/src/docs/openapi.test.ts`.

## Rules

- Each route must have its own folder under `docs` (e.g. `docs/invites`, `docs/superadmin/organisations`).
- Place route-specific schemas in a `schemas/` subfolder within each route folder.
- OpenAPI registry aggregation files must be named `openapi.<route>.ts` (e.g. `openapi.invites.ts`, `openapi.superadmin.ts`).
  - For subresources or nested routes, use `openapi.<parent>-<subresource>.ts` (e.g. `openapi.superadmin-invites.ts`).
  - For HTTP method-specific schema files, use `openapi.<method>-<resource>.ts` (e.g. `openapi.post-invites.ts`, `openapi.patch-invites.ts`).
  - Always use explicit, descriptive names for all OpenAPI and schema files; avoid ambiguous or generic names.
- Remove or rename any legacy `openapi.ts` files in route folders after migration.
- Superadmin routes and schemas should be grouped under `docs/superadmin/{resource}`.
- Do not use index.ts barrel files. Use explicit, descriptive file/module names.
- Only define OpenAPI-only schemas in `docs/` if not shared elsewhere.
- Follows all conventions in `api.instructions.md` and `AGENTS.md`.
- Keeps request, query, and body schemas in `server/src/libs/schemas/**`.
- Uses and updates constants in `server/src/constants` as needed.
- Uses snake_case for API fields, camelCase for code.
- Uses British English spelling in all repository-authored prose.
- Keeps OpenAPI docs aligned with runtime request and response shapes.
- After changes, ensures `openapi.test.ts` covers all new/changed paths.

## Responsibilities

- Create and update OpenAPI and Swagger docs in `server/src/docs`.
- Create and update Zod schemas in `server/src/libs/schemas`.
- Use and extend constants in `server/src/constants`.
- Ensure all new/changed API paths are tested in `server/src/docs/openapi.test.ts`.

## Testing

- After any change, run: `cd server && npm run lint && npm run lint:typescript && npm run test`
- All new/changed API paths must be covered by tests in `openapi.test.ts`.

## References

- See `.github/instructions/api.instructions.md` and `server/AGENTS.md` for full conventions and rules.
