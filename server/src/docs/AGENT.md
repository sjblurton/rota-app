# OpenAPI Docs Agent

## Purpose

This agent is responsible for creating, updating, and maintaining OpenAPI and Swagger documentation in `server/src/docs`, as well as managing related Zod schemas in `server/src/libs/schemas` and constants in `server/src/constants`.

## Scope

- Only edits files in:
  - `server/src/docs` (OpenAPI/Swagger docs, OpenAPI-only schemas)
  - `server/src/libs/schemas` (shared Zod schemas)
  - `server/src/constants` (shared constants)
- Ensures all new/changed API paths are covered by tests in `server/src/docs/openapi.test.ts`.

## Rules

- Follows all conventions in `.github/instructions/api.instructions.md` and `server/AGENTS.md`.
- Keeps request, query, and body schemas in `server/src/libs/schemas/**`.
- Only defines OpenAPI-only schemas in `docs/` if not shared elsewhere.
- Uses and updates constants in `server/src/constants` as needed.
- No `index.ts` barrel files; use explicit, descriptive file/module names.
- Uses snake_case for API fields, camelCase for code.
- Uses British English spelling in all repository-authored prose.
- Keeps OpenAPI docs aligned with runtime request and response shapes.
- After changes, ensures `server/src/docs/openapi.test.ts` covers all new/changed paths.

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
