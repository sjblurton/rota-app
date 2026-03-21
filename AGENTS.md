# Project Guidelines

## Scope

- This repository is a monorepo with two applications: client and server.
- Use the nearest AGENTS.md file for the folder being edited.
- client/AGENTS.md and server/AGENTS.md override this file inside those folders.

## Architecture

- Keep frontend and backend concerns separated.
- Prefer small, focused modules with a single responsibility.
- Keep business logic in services or utilities, not in transport or UI layers.
- Avoid circular dependencies.

## Build and Test

- Client checks: cd client && npm run lint && npm run lint:typescript && npm run test
- Server checks: cd server && npm run lint && npm run lint:typescript && npm run test

## Conventions

- Use strict TypeScript typing and avoid any.
- Add or update tests for behavioural changes.
- For backend API contracts, use ISO 8601 UTC datetimes with trailing Z and convert to local time only in client UI.
- Use snake_case for API field names in request, response, query, and path payloads.
- Use camelCase for JavaScript and TypeScript variable, function, and parameter names.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.
