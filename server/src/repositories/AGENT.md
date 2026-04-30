# Repositories Folder Agent Guide

## Purpose

This folder contains repository functions for all database access. Repositories:

- Encapsulate all direct reads/writes to the database (via Prisma).
- Provide a single place to update queries if the database schema changes.
- Are used by services, not by controllers/routes directly.

## Guidelines

- Each entity or domain concept should have its own repository file (e.g. `invites.repository.ts`).
- All repository functions should accept an optional `tx?: PrismaClient` argument, defaulting to the imported `prisma` instance. This allows for easy mocking in tests and for transaction control in services/transactions.
- Repository functions:
  - Should be pure and only interact with the database (no business logic, no validation, no side effects).
  - May accept IDs and other parameters to support testability and flexible queries.
  - Should not throw custom errors except for database errors (let services handle business errors).
  - May use helpers/utilities for data cleaning (e.g. removing undefined fields before update).
- If a set of database changes must be performed atomically, place them in the `transactions/` folder as a transaction function using Prisma's `$transaction`.
- Do not import repositories directly in controllers/routes—always go through a service.
- No unit tests are required for pure repository functions (as they only test Prisma), but if a repository does more (e.g. data cleaning, transformation), add a focused test for that logic only.

## Testing

- Repository tests (e.g. `update-invites.repository.test.ts`) should only exist if the function does more than a direct Prisma call (e.g. data cleaning, field omission).
- For integration tests, use real database IDs and test data as needed.

## Example

```ts
// update-invites.repository.ts
export const updateInvitesRepository = async ({ tx = prisma, data }) => {
  const { id, ...rest } = data
  const cleaned = cleanDeep(rest, { undefinedValues: true })
  return tx.invite.update({ where: { id }, data: cleaned })
}
```

## Transactions

- Use the `transactions/` folder for multi-step DB operations that must succeed or fail together.
- Each transaction should be a single function that receives a Prisma transaction client and coordinates the steps.

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
- See server/src/services for orchestration/business logic.
