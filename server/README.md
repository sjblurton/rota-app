# Server

Express REST API for the Rota application.

## Stack

- **Express 5** — HTTP framework
- **TypeScript** — strict mode
- **Zod** — runtime schema validation
- **@asteasolutions/zod-to-openapi** — OpenAPI document generation
- **swagger-ui-express** — Swagger UI for interactive API documentation
- **Prisma** — PostgreSQL ORM
- **Vitest** — unit and integration tests
- **eslint-plugin-boundaries** — architectural boundary enforcement

## Source Structure

```text
src/
├── app.ts                    # Express app setup (middleware, routers)
├── server.ts                 # Entry point (startup, DB connectivity check)
├── constants/                # Shared constants (HTTP errors, status codes, plan types)
├── libs/                     # Shared domain libraries (auth, logging, database, schemas)
│   ├── auth/                 # Authentication helpers
│   ├── logger/               # Logging utilities
│   ├── prisma/               # Database connection
│   └── schemas/              # Reusable Zod schemas
│       ├── entities/         # Entity schemas (organisation, shift, etc.)
│       ├── pagination/       # Pagination query schemas
│       └── strings/          # String validation schemas
├── @types/                   # Type definitions (derived via z.infer<>)
├── utils/                    # Stateless helpers (validation, env, http)
│   ├── env/                  # Environment variable reading
│   ├── http/                 # HTTP helpers (status codes, headers)
│   └── validation/           # Schema validation utilities
├── generated/                # Prisma generated client (prisma/ input)
├── api/                      # Feature-based API modules (colocated by feature)
│   ├── {feature}/            # feature
│   │   ├── controllers/      # Feature-specific controllers
│   │   ├── routers/          # Feature-specific Express routers
│   │   └── docs/             # Feature-specific OpenAPI docs and schemas
├── routers/                  # Top-level router mounting and role-based middleware
│   └── {shared-router}/      # shared-router (e.g. admin, superadmin) that would be used by multiple features routers
│       └── middleware/       # shared-route middleware
```

**Key Principles:**

- Each feature lives under `src/api/{feature}/` and is self-contained with its own controllers, routers, and docs.
- Shared/domain schemas live in `libs/schemas/`; do not define reusable validation or domain schemas inside feature docs (except for OpenAPI-only schemas).
- Middleware for admin and superadmin is colocated under their respective `src/routers/{role}/middleware/` folders.
- OpenAPI documentation is colocated with the feature in `src/api/{feature}/docs/` and should reference shared schemas where possible; keep only documentation-specific schema definitions in feature docs.
- Do not use `index.ts` barrel files. Name modules explicitly by their content (e.g. `params.ts`, `query.ts`, `schemas.ts`).
- Import directly from the explicit file path, not from a folder.
- Routers may only import controllers, not services or repositories directly (enforced by eslint-boundaries).

## Architectural Boundaries

Enforced by `eslint-plugin-boundaries` with deny-by-default. **Global types** (`libs`, `utils`, `types`, `constants`) may be imported by any module.

| From                        | May import                                                             |
| --------------------------- | ---------------------------------------------------------------------- |
| `api/{feature}/controllers` | Any service, any global type                                           |
| `api/{feature}/routers`     | Controllers for same feature, any global type, other routers, `app.ts` |
| `api/{feature}/docs`        | Other docs, any global type                                            |
| `libs/`                     | Other `libs/`, `generated/prisma`, global types                        |
| `utils/`                    | Other `utils/`, `libs/`, global types                                  |
| `constants/`                | Other `constants/`, `libs/`, `utils/`                                  |
| `@types/`                   | Other `@types/`, global types                                          |
| `app.ts`, `server.ts`       | Any global type, routers, docs (bootstrap layer)                       |

## Naming Conventions

- API field names in request, response, query, and path payloads use snake_case.
- JavaScript and TypeScript variable, function, and parameter names use camelCase.
- API file names under `src/api/**` use kebab-case and plural form for folders: `controllers/`, `services/`, `routers/`.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.
- Keep shared request, query, and body Zod schemas in `src/libs/schemas/**`, never inside feature docs except for OpenAPI-only schemas.
- Derive TypeScript types via `z.infer<>` in `src/@types/*.ts`; never duplicate type definitions.

## Time Handling

- All backend times are handled as JavaScript `Date` objects and validated/stored as ISO 8601 UTC strings with trailing `Z`.
- The backend does not convert to local time; the frontend is responsible for any local time formatting or conversion.
- See `libs/schemas/time/dateTime.ts` for the shared Zod datetime schema.
- Shared domain/request/response schemas live in `libs/schemas/`; OpenAPI-only schemas and registries may live under `docs/`.
- Routers mount modules via `routers/{module}/`.
- Docs own OpenAPI registration and other documentation-only API descriptions, rather than defining them inside feature modules.

## Commands

```bash
npm run dev            # Start development server with hot reload
npm run lint           # ESLint
npm run lint:typescript # TypeScript type check
npm run test           # Run tests (Vitest)
npm run test:int       # Run integration tests
```

## Testing

All tests are unit tests (`*.test.ts`).

- No tests access the database; all dependencies are mocked.
- Tests cover services, controllers, repositories, and utilities in isolation.
- Example: `src/libs/logger/logger.test.ts`

To run all tests:

```bash
npm run test
```

To run a specific test file:

```bash
npm run test -- src/libs/logger/logger.test.ts
```

To run tests with coverage report:

```bash
npm run test:coverage
```

To run in watch mode:

```bash
npm run test -- --watch
```

## End-to-End (E2E) Testing

E2E tests run against a real PostgreSQL database and require Docker or a local Postgres instance.

### Running E2E Tests

1. Ensure Docker is running, or you have a local Postgres instance available at: `postgresql://postgres:pass123@localhost:5432/` (You can adjust this in `.env.test`.)
2. Start a Postgres container (if needed): `docker run --name rota-e2e-postgres -e POSTGRES_PASSWORD=pass123 -p 5432:5432 -d postgres:16`
3. Run the e2e tests: `npm run test:e2e
   - Each test worker uses its own isolated database for parallel, reliable runs.
   - Databases are created and dropped automatically during test setup/teardown.

### Notes

- E2E tests are configured in `vitest.e2e.config.ts` and use `test/setup-db.ts` for per-worker DB setup.
- You can customise the database connection in `.env.test`.
- Make sure to stop and remove the Docker container after testing:

  ```bash
  docker stop rota-e2e-postgres && docker rm rota-e2e-postgres
  ```

### Coverage Requirements

Minimum coverage thresholds (enforced by `npm run test:coverage`):

- **Lines:** 90%
- **Functions:** 90%
- **Branches:** 90%
- **Statements:** 90%

Excluded from coverage: `src/server.ts`, `src/app.ts` (bootstrap layer).

### Writing Tests

**Unit Test Example:**

```typescript
// src/libs/logger/logger.test.ts
import { describe, it, expect } from "vitest";
import { logger } from "./logger";

describe("logger", () => {
  it("logs messages", () => {
    expect(logger).toBeDefined();
  });
});
```

### Test Environment Variables

During tests:

- `NODE_ENV=test` (or `test` env file)
- `DATABASE_URL=postgresql://postgres:pass123@localhost:5432/rota_test`
- `SUPERADMIN_API_KEY=test-secret-key`

These are configured in:

- `.github/workflows/ci.yml` (GitHub Actions)
- `.env.test` (local testing)

## Setup and Running

### Prerequisites

- Node.js 22+
- PostgreSQL 16+
- `.env.local` file with:

  ```text
  DATABASE_URL=db-url-for-local-development
  SUPERADMIN_API_KEY=your-secret-key
  NODE_ENV=development
  ```

### Local Development

```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

The server will start at `http://localhost:3000` with automatic hot reload.

### API Documentation

Interactive Swagger UI with try-it-out functionality:

- **Local:** `http://localhost:3000/api/v1/docs/`
- **Staging:** `https://rota-app-e45i.onrender.com/api/v1/docs/`

Authentication: Use the Authorize button and enter your `SUPERADMIN_API_KEY`.

### Endpoints

#### Organisations (Superadmin)

**POST** `/api/v1/superadmin/organisations` — Create organisation

```bash
curl -X POST http://localhost:3000/api/v1/superadmin/organisations \
  -H 'X-Superadmin-Key: your-api-key' \
  -H 'Content-Type: application/json' \
  -d '{"name":"Acme","status":"active","plan":"pro"}'
```

**GET** `/api/v1/superadmin/organisations` — List organisations with pagination

```bash
curl -X GET 'http://localhost:3000/api/v1/superadmin/organisations?limit=10&offset=0' \
  -H 'X-Superadmin-Key: your-api-key'
```

Query parameters:

- `limit` — page size (default: 10)
- `offset` — page offset (default: 0)
- `order_by_key` — sort by: `created_at`, `updated_at`, `name`, `status`, or `plan`
- `order` — sort direction: `asc` or `desc` (default: `desc`)
