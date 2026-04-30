# Schemas Folder Agent Guide

## Purpose

This folder contains all shared Zod schemas for the backend. These schemas:

- Define the shape and validation for all domain models and API payloads.
- Are the single source of truth for generating TypeScript types (via `z.infer`) exported from `src/types`.
- Are used for validating data at API boundaries and for OpenAPI documentation in `src/api/{module}/docs`.
- Should closely match the structure of the database models in `prisma/schema.prisma` where relevant.

## Guidelines

- Each entity or domain concept should have its own schema file (e.g. `user.ts`, `invite.ts`).
- Start with a base schema for each entity (e.g. in `entities/base.ts` or a similar file).
- For request/response bodies (e.g. create, patch), always:
  - Use `.extend()`, `.pick()`, `.omit()`, or similar Zod methods to derive the schema from the base entity schema.
  - Do not duplicate field definitions—always build on the base schema for consistency and maintainability.
- Schemas must:
  - Use strict validation (no `any`).
  - Include `.describe()` and `.openapi({ example })` where helpful for docs and clarity.
  - Export both the Zod schema and the inferred TypeScript type.
- Do not include business logic or database access in this folder.
- Only define schemas here that are shared or reused; feature-specific or one-off schemas can be defined in the relevant `docs/` folder.
- Keep schemas in sync with the database schema and update types as needed.

## Example

```ts
// invite.ts
import { z } from 'zod'
export const inviteSchema = z
  .object({
    id: z.string().uuid(),
    email: z.string().email(),
    // ...
  })
  .describe('Invite entity')
  .openapi({ example: { id: '...', email: '...' } })
export type Invite = z.infer<typeof inviteSchema>
```

## Agent Instructions

- When adding or editing schemas, always:
  1. Ensure the schema matches the database and API contract.
  2. Add/maintain `.describe()` and `.openapi({ example })` for clarity and OpenAPI.
  3. Export the inferred type for use in `src/types`.
  4. Do not add business logic or DB code here.

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
- See server/src/types for type exports.
- See server/src/api/{module}/docs for OpenAPI usage.
