# Server Guidelines

## Scope

- Applies to files under server/.

## Architecture

- Keep HTTP handling in route handlers or controllers.
- Keep business logic and orchestration in services.
- Keep validation, models, and pure helpers independent from HTTP concerns.
- Group modules by feature first, then by role.
- Avoid circular dependencies.

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
- Reuse shared date-time schemas from `server/src/libs/schemas/time/dateTime.ts` instead of redefining date validators.
- Convert timestamps to local time only in the client display layer.
- Use snake_case for API field names in request, response, query, and path payloads.
- Use camelCase for JavaScript and TypeScript variable, function, and parameter names.
- Use kebab-case for API file names under `server/src/modules/**` and `server/src/docs/**`.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.
- Keep shared request, query, and body Zod schemas in `server/src/libs/schemas/**`, not inside docs files.
- Derive TypeScript types via `z.infer<>` in `src/types/*.ts`; never duplicate type definitions.

## Services and Controllers

- Keep controllers thin and focused.
- Delegate business logic and external integrations to services.
- Keep services stateless and reusable where possible.

## Testing and Reliability

- Add or update tests for every behavioural change.
- Write unit tests for services and utilities; suffix files `*.test.ts`.
- Write integration tests for HTTP endpoints and controller behaviour; suffix files `*.int.test.ts`.
- Keep tests deterministic and isolate dependencies with test doubles.
- Maintain minimum 90% coverage (lines, functions, branches, statements); enforced by `npm run test:coverage`.

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
