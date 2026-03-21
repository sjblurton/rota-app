# Server

Express REST API for the Rota application.

## Stack

- **Express 5** — HTTP framework
- **TypeScript** — strict mode
- **Zod** — runtime schema validation
- **@asteasolutions/zod-to-openapi** — OpenAPI document generation
- **swagger-ui-express** — Swagger UI at `/api/docs`
- **Vitest** — unit and integration tests
- **eslint-plugin-boundaries** — architectural boundary enforcement

## Source Structure

```text
src/
├── app.ts              # Express app setup (middleware, routes)
├── server.ts           # Entry point (binds port)
├── docs/               # OpenAPI documentation layer
│   ├── internal/       # Private helpers (only docs/schemas.ts may import)
│   ├── openapi.ts      # Merges all module OpenAPI documents
│   ├── responses.ts    # Shared HTTP response schemas
│   └── schemas.ts      # OpenAPI schema registry (registers Zod entities)
├── lib/                # Shared domain libraries
│   └── schemas/
│       ├── entities/   # Zod entity schemas (shifts, staff, organisation, swaps, etc.)
│       └── parameters/ # Zod request/query schemas
│           ├── token.ts    # Path parameters (token)
│           ├── filters.ts  # Query filters (time ranges, entity types, etc.)
│           └── inputs.ts   # Request body schemas (shift responses, swap statuses, etc.)
├── modules/            # Feature modules (isolated per feature)
│   ├── admin/          # Admin management routes
│   ├── shifts/         # Shift management routes
│   ├── swaps/          # Swap request routes
│   ├── superadmin/     # Owner-only provisioning routes
│   ├── token/          # Public token-based routes
│   └── webhooks/       # Inbound webhook handlers
└── utils/              # Stateless helpers and utilities
```

Each module lives entirely within its own folder. Module-level tests live alongside the code they test inside `modules/{feature}/`.

## Architectural Boundaries

Enforced by `eslint-plugin-boundaries` with deny-by-default:

| From                  | May import                                                   |
| --------------------- | ------------------------------------------------------------ |
| `modules/{feature}`   | Sibling files within the same module, `lib`, `utils`, `docs` |
| `docs`                | `docs`, `lib`, `utils`, modules (for orchestration)          |
| `docs/schemas.ts`     | `docs/internal` (private), `lib`                             |
| `lib`                 | Within `lib` only                                            |
| `utils`               | `utils`, `lib`                                               |
| `source` (app/server) | `docs`, `lib`, `utils`                                       |

Cross-module imports are blocked. `docs/internal` is strictly private to `docs/schemas.ts`.

## Commands

```bash
npm run dev            # Start development server with hot reload
npm run lint           # ESLint
npm run lint:typescript # TypeScript type check
npm run test           # Run tests (Vitest)
```

## Date and Time Contract

- API request and response timestamps use ISO 8601 UTC datetimes with a trailing Z suffix.
- Shared date-time validation lives in `src/lib/schemas/dateTime.ts` and should be reused rather than redefining date schemas.
- Timezone conversion for display happens in the client only.
- Server-side comparisons should use parsed instants, not lexicographic string comparison.
