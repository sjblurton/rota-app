# Server Guidelines

## Scope

- Applies to files under server/.

## Architecture

- Keep HTTP handling in route handlers or controllers.
- Keep business logic and orchestration in services.
- Keep validation, models, and pure helpers independent from HTTP concerns.
- Group modules by feature first, then by role.
- Avoid circular dependencies.

## Source Structure

Understand and follow the layout in [server/README.md](README.md#source-structure):

| Folder / Pattern                    | Purpose                                                             |
| ----------------------------------- | ------------------------------------------------------------------- |
| `src/app.ts`                        | Express app entry point and global middleware                       |
| `src/server.ts`                     | Startup entry point with startup checks                             |
| `src/constants/`                    | Shared constants (HTTP errors, status codes, plan types)            |
| `src/libs/`                         | Shared domain libraries (auth, logging, database, schemas)          |
| `src/types/`                        | TypeScript types derived via `z.infer<>`; never duplicate type defs |
| `src/utils/`                        | Stateless helpers (validation, environment, HTTP)                   |
| `src/generated/`                    | Prisma-generated code; do not edit                                  |
| `src/api/{feature}/controllers/`    | Feature-specific controllers                                        |
| `src/api/{feature}/routes/`         | Feature-specific Express routers                                    |
| `src/api/{feature}/docs/`           | OpenAPI documentation and route-specific schemas for the feature    |
| `src/routes/admin/middleware/`      | Admin-only middleware (e.g. JWT auth)                               |
| `src/routes/superadmin/middleware/` | Superadmin-only middleware (e.g. API key)                           |

**Key Rules:**

- Each feature lives under `src/api/{feature}/` and is self-contained with its own controllers, routes, and docs.
- Shared/domain schemas live in `libs/schemas/`; do not define reusable validation or domain schemas inside feature docs (except for OpenAPI-only schemas).
- Middleware for admin and superadmin is colocated under their respective `src/routes/{role}/middleware/` folders.
- OpenAPI documentation is colocated with the feature in `src/api/{feature}/docs/` and should reference shared schemas where possible; keep only documentation-specific schema definitions in feature docs.
- Do not use `index.ts` barrel files. Name modules explicitly by their content (e.g. `params.ts`, `query.ts`, `schemas.ts`).
- Import directly from the explicit file path, not from a folder.
- Routes may only import controllers, not services or repositories directly (enforced by eslint-boundaries).

## TypeScript

- Use strict type checking.
- Prefer type inference when obvious.
- Avoid any; use unknown when input type is uncertain.

## Module Conventions

- Do not create `index.ts` barrel files. Name modules explicitly by their content (e.g. `params.ts`, `query.ts`, `schemas.ts`).
- Import directly from the explicit file path, not from a folder.
- Routes may only import controllers, not services or repositories directly (enforced by eslint-boundaries).

## API and Validation

- Follow REST conventions for resource naming, HTTP methods, and status codes.
- Validate incoming data with `validateAndParse(schema, data)` from `utils/validation/` at the controller boundary — not inside services.
- Throw `new HttpErrorByCode('bad_request', detail?)` for HTTP errors; available codes are in `constants/http-errors.ts`.
- Use ISO 8601 UTC datetimes with trailing Z for API request and response timestamps.
- Reuse shared date-time schemas from `src/libs/schemas/time/dateTime.ts` instead of redefining date validators.
- Convert timestamps to local time only in the client display layer.
- Use snake_case for API field names in request, response, query, and path payloads.
- Use camelCase for JavaScript and TypeScript variable, function, and parameter names.
- Use kebab-case for API file names under `src/modules/**` and `src/docs/**`.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.
- Keep shared request, query, and body Zod schemas in `src/libs/schemas/**`, never inside docs or modules.
- Derive TypeScript types via `z.infer<>` in `src/types/*.ts`; never duplicate type definitions.

## Services and Controllers

- Keep controllers thin and focused.
- Delegate business logic and external integrations to services.
- Keep services stateless and reusable where possible.

## Testing and Reliability

See [Testing section in README](README.md#testing) for full details on test setup and database reset workflow.

**Guidelines:**

- Add or update tests for every behavioural change.
- Write unit tests (`*.test.ts`) for services and utilities; run fast, no database.
- Write integration tests (`*.int.test.ts`) for HTTP endpoints and database interactions.
- Integration tests run sequentially; database is completely **reset before and after** each test run via `npm run db:reset:force`.
- Keep tests deterministic and isolate dependencies with test doubles.
- Maintain minimum 90% coverage (lines, functions, branches, statements); enforced by `npm run test:coverage`.
- Never assume test isolation via transactions; rely on global database reset instead.

## Deprecations and Migrations

- When editing server code, check for deprecated APIs, tags, methods, or configuration in touched files.
- Prefer the current recommended replacement over adding new deprecated usage.
- If existing touched code uses deprecated patterns, migrate it to the recommended approach in the same change when low risk.
- If migration is risky or breaking, document the deprecation and recommended replacement in your response and propose a safe follow-up.
- Keep examples and docs aligned with the non-deprecated approach.

## Commands

- Development: cd server && npm run dev
- Lint: cd server && npm run lint
- Type check: cd server && npm run lint:typescript
- Test: cd server && npm run test

## ESLint Boundaries

The server uses `eslint-plugin-boundaries` to enforce architectural boundaries and prevent accidental violations of the intended module structure. Boundaries are not just for appeasing ESLint—they are essential for upholding the architecture and maintainability of the codebase.

- **Rule organisation:** Boundaries rules are grouped by architectural concern in `server/eslint/boundaries-*.mjs`.
- **Purpose:** Each rule exists to preserve the intended separation of concerns, prevent tight coupling, and make the codebase easier to reason about and scale.
- **Do not add or relax rules simply to silence ESLint errors.** If a rule is causing friction, review whether the architectural boundary is still correct and discuss with the team before making changes.
- **See:** [server/eslint/boundaries/AGENT.md](eslint/boundaries/AGENT.md) for detailed maintenance guidelines and rationale.
