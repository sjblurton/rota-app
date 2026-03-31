# Seed Utilities

This folder contains shared seeding utilities and conventions for creating test and demo data across the codebase.

## Conventions

- **No `index.ts` or barrel files:** All modules must be explicitly named and imported.
- **Explicit file naming:** Name each seed or utility file by its purpose (e.g. `seed-manager.ts`, `seed-organisation.ts`, `fixtures/static-managers.ts`).
- **Fixtures in TypeScript:** Store static data in `.ts` files under a `fixtures/` subfolder for type safety and easy reuse. Import types from Zod schemas where possible.
- **Static IDs:** All seeded entities should use fixed, predictable IDs to support repeatable manual and automated testing.
- **Separation of logic and data:** Seed logic files should import data from fixtures, not hardcode it.
- **Shared fixtures:** Place any fixtures used by multiple modules in `src/fixtures`.
- **ESLint/project boundaries:** If you introduce new folders or move seed logic, update ESLint boundaries and project configuration to reflect the new structure and maintain architectural integrity.
- **Seeding order:** Be aware that some entities depend on others (e.g., an organisation must be seeded before a manager if the manager references the organisation by ID). Document and enforce the correct seeding order in your scripts.
- **Testing:** Always add or update tests for seed logic. Ensure that seed scripts are covered by automated tests and that changes to seed data or logic are validated by corresponding test updates.

## Folder Structure Example

```text
seed/
  README.md
  seed-manager.ts
  seed-organisation.ts
  utils/
    create-with-logging.ts
  fixtures/
    static-managers.ts
    static-organisations.ts
src/
  fixtures/
    shared-roles.ts
```

## Example: TypeScript Fixture

```ts
// fixtures/static-managers.ts
import { Manager } from "../../lib/schemas/entities/managers";

export const staticManagers: Manager[] = [
  {
    id: "manager-demo-001",
    name: "Demo Manager",
    email: "demo.manager@example.com",
    // ...other fields
  },
];
```

## Example: Seed Logic

```ts
// seed-manager.ts
import { staticManagers } from "./fixtures/static-managers";
import { createManager } from "../routes/managers/services/create-manager";

export async function seedManager() {
  for (const manager of staticManagers) {
    await createManager(manager); // Should use the static ID from the fixture
  }
}
```

## Usage

- Import and call the relevant seed function in your test or setup script.
- All seed functions are idempotent: running them multiple times should not create duplicates due to static IDs.

## Adding New Seeds

1. Add static data to a new or existing fixture in `fixtures/` (or `src/fixtures` for shared data).
2. Create a new seed logic file, named for its purpose.
3. Ensure all IDs are static and unique.
4. Do not create or use `index.ts` files.

---
