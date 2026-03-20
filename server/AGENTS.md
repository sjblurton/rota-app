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

## API and Validation

- Follow REST conventions for resource naming, HTTP methods, and status codes.
- Return clear and consistent error responses.
- Keep endpoints predictable and idempotent where applicable.
- Validate incoming data with zod.

## Services and Controllers

- Keep controllers thin and focused.
- Delegate business logic and external integrations to services.
- Keep services stateless and reusable where possible.

## Testing and Reliability

- Add or update tests for every behavioral change.
- Write unit tests for services and utilities.
- Write integration tests for HTTP endpoints and controller behavior.
- Keep tests deterministic and isolate dependencies with test doubles.

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
