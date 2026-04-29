# Services Folder Agent Guide

## Purpose

This folder contains service functions for all business logic and orchestration. Services:

- Coordinate calls to repositories, other services, and utilities.
- Contain business rules, validation, and error handling that go beyond simple data access.
- Are the only layer that should call repositories directly.

## Guidelines

- Each feature or domain concept should have its own service file (e.g. `accept-invite-service.ts`).
- Service functions:
  - Should orchestrate multiple repository calls, business rules, and error handling.
  - Should not contain HTTP or Express-specific logic (keep that in controllers/routes).
  - Should not import or use Express request/response objects.
  - Should be pure and stateless where possible.
  - Should accept dependencies (e.g. repository or service functions) as optional arguments, defaulting to the real implementation. This allows for easy mocking in unit tests.
- Always default dependency arguments to the real implementation, e.g.: `export const myService = async ({ dep = realDep, ...args }) => { ... }`
- Do not import repositories in controllers/routes—always go through a service.
- Do not call external APIs directly from services unless it is part of the business logic (prefer a dedicated integration layer if needed).

## Testing

- Unit test all service logic, mocking dependencies as needed.
- Pass mock functions for repositories/services to test error and edge cases.

## Example

```ts
export const acceptInviteService = async ({
  updateInvite = updateInviteService,
  createUser = createUserService,
  getInviteById = getInviteByIdService,
  ...args
}) => {
  // business logic
};
```

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
- See server/src/repositories for data access.
- See server/src/api/{module}/controllers for HTTP logic.
