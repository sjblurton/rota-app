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
├── app.ts                    # Express app setup (middleware, routes)
├── server.ts                 # Entry point (startup, health checks)
├── constants/                # Shared constants (HTTP errors, status codes, plan types)
├── docs/                     # OpenAPI documentation layer
│   ├── errors/               # Error response schemas
│   ├── openapi.ts            # Merges all module OpenAPI documents
│   ├── responses.ts          # Shared HTTP response schemas
│   └── superadmin/           # Superadmin API documentation
│       ├── openapi.ts        # Superadmin OpenAPI registry
│       ├── constants/
│       └── schemas/          # Endpoint schemas (organisations, etc.)
├── generated/                # Prisma generated client (prisma/ input)
├── libs/                     # Shared domain libraries
│   ├── auth/                 # Authentication middleware
│   ├── logger/               # Logging utilities
│   ├── prisma/               # Database connection
│   └── schemas/              # Reusable Zod schemas
│       ├── entities/         # Entity schemas (organisation, shift, etc.)
│       ├── pagination/       # Pagination query schemas
│       ├── strings/          # String validation schemas
│       └── time/             # Date-time validators (ISO 8601 UTC)
│           └── dateTime.ts   # Shared datetime schema
├── modules/                  # Feature modules (isolated, one per feature)
│   └── organisations/        # Organisations feature
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── handler/
│       └── *.int.test.ts
├── routes/                   # Route mounting layer
│   ├── organisations/
│   └── superadmin/
├── types/                    # Type definitions (derived via z.infer<>)
│   └── *.ts
└── utils/                    # Stateless helpers (validation, env, http)
    ├── env/                  # Environment variable reading
    ├── http/                 # HTTP helpers (status codes, headers)
    └── validation/           # Schema validation utilities
```

**Key Principles:**

- Each feature module lives entirely within `modules/{feature}/`.
- Module-level tests live alongside code with `*.int.test.ts` suffix.
- Shared schemas live in `libs/schemas/`, never inside docs or route files.
- Routes mount modules via `routes/{module}/`.
- Docs register OpenAPI for the API layer, not inside modules.

## Architectural Boundaries

Enforced by `eslint-plugin-boundaries` with deny-by-default. **Global types** (`libs`, `utils`, `docs`, `types`, `constants`) may be imported by any module.

| From                  | May import                                                                        |
| --------------------- | --------------------------------------------------------------------------------- |
| `modules/{feature}`   | Sibling files within same module, any global type (`libs`, `utils`, `docs`, etc.) |
| `routes/{feature}`    | Module controllers in same route, any global type, other routes, `app.ts`         |
| `docs/`               | Other `docs/` files, any global type, modules (for orchestration)                 |
| `libs/`               | Other `libs/`, `generated/prisma` (Prisma client), global types                   |
| `utils/`              | Other `utils/`, `libs/`, global types                                             |
| `constants/`          | Other `constants/`, `libs/`, `utils/`                                             |
| `types/`              | Other `types/`, global types                                                      |
| `app.ts`, `server.ts` | Any global type, `routes/`, `docs/` (bootstrap layer)                             |

**Key constraints:**

- Cross-module imports are blocked (e.g., `modules/organisations/` ↛ `modules/shifts/`).
- Schemas live in `libs/schemas/` and must be imported into docs or modules, never duplicated.
- Test files (`.int.test.ts`) within modules/routes may import from `app.ts` for test setup.
- Prisma client is generated; never edit `generated/`. Consume via `libs/prisma/`.

## Commands

```bash
npm run dev            # Start development server with hot reload
npm run lint           # ESLint
npm run lint:typescript # TypeScript type check
npm run test           # Run tests (Vitest)
npm run test:int       # Run integration tests
```

## Testing

### Test Types

**Unit Tests** (`*.test.ts`)

- Fast, isolated tests for services, utilities, and pure functions
- Run against `node` environment only
- No database access
- Example: `src/libs/logger/logger.test.ts`

**Integration Tests** (`*.int.test.ts`)

- Slow, full-stack tests for HTTP endpoints and database interactions
- Run sequentially (not in parallel) to ensure database consistency
- Database is **completely reset** before and after test run
- Example: `src/routes/organisations/organisations-router.int.test.ts`

### Database Setup for Integration Tests

Integration test flow:

1. **Global setup** (`test/global-int-setup.ts`) runs before all tests:
   - Executes `npm run db:reset:force` which:
     - Drops and recreates test database
     - Runs all migrations (`prisma migrate deploy`)
     - Seeds database (`prisma db seed`)

2. **Tests run** sequentially against fresh database

3. **Global teardown** runs after all tests:
   - Executes `npm run db:reset:force` again for cleanup

**Important:** Each test run starts with a clean database. Do not rely on test isolation via separate transactions; rely on the global reset instead.

### Running Tests

```bash
# Run all unit tests (fast, no DB)
npm run test

# Run all integration tests (slow, uses DB)
npm run test:int

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm run test -- src/libs/logger/logger.test.ts

# Watch mode (unit tests only)
npm run test -- --watch
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

**Integration Test Example:**

```typescript
// src/routes/organisations/organisations-router.int.test.ts
import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../app";

describe("GET /api/v1/superadmin/organisations", () => {
  it("returns 200 with organisations list", async () => {
    const response = await request(app)
      .get("/api/v1/superadmin/organisations")
      .set("X-Superadmin-Key", process.env.SUPERADMIN_API_KEY!);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
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

  ```test
  DATABASE_URL=postgresql://user:password@localhost:5432/rota
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

- **Local:** http://localhost:3000/api/v1/docs/
- **Staging:** https://rota-app-e45i.onrender.com/api/v1/docs/

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

## Date and Time Contract

- API request and response timestamps use ISO 8601 UTC datetimes with a trailing Z suffix.
- Shared date-time validation lives in `src/libs/schemas/time/dateTime.ts` and should be reused rather than redefining date schemas.
- Timezone conversion for display happens in the client only.
- Server-side comparisons should use parsed instants, not lexicographic string comparison.

## Naming Conventions

- API field names in request, response, query, and path payloads use snake_case.
- JavaScript and TypeScript variable, function, and parameter names use camelCase.
- API file names under `src/modules/**` and `src/docs/**` use kebab-case.
