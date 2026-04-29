# E2E Test Agent Guide

## Purpose

This folder contains end-to-end (E2E) tests for API endpoints. The goal is to verify that endpoints are accessible and function as expected in a running app, covering only the main ("happy path") flows.

## Guidelines

- Write one E2E test per endpoint to prove it works end-to-end (request → response).
- Focus on the happy path: valid input, expected output, and correct status codes.
- Do not cover all edge cases, error handling, or validation failures here—these belong in unit or integration tests.
- Only add extra E2E tests for exceptions if there is a strong reason (e.g. critical security, regression, or integration with external systems).
- Use realistic data and environment setup, but keep tests fast and isolated.
- Use supertest or similar to make real HTTP requests to the app.
- **Do not call external services (e.g. Supabase, third-party APIs) directly in E2E tests.**
  - Instead, mock or stub external dependencies (such as authentication, email, or storage) using test helpers or dependency injection.
  - Provide test utilities (e.g. `createTestAdminApp`) to inject mock implementations or users as needed.
  - If an external call is unavoidable, isolate it and document why.

## Structure

- Place each feature's E2E tests in its own file or folder, named after the resource or endpoint.
- Use clear, descriptive test names and keep test files focused.

## Example

```text
e2e/
  invites/
    e2e.invites.test.ts
  organisations/
    e2e.organisations.test.ts
```

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
