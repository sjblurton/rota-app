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
├── server.ts                 # Entry point (startup, DB connectivity check)
├── constants/                # Shared constants (HTTP errors, status codes, plan types)
├── controllers/              # HTTP controllers, grouped by feature (e.g. organisations/)
│   └── {feature}/            # Controller files for each feature
├── docs/                     # OpenAPI documentation layer
│   ├── errors/               # Error response schemas
│   ├── openapi.ts            # Merges all OpenAPI docs
│   └── superadmin/           # Superadmin API documentation
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
├── repositories/             # Data access layer, grouped by feature
│   └── {feature}/            # Repository files for each feature
├── routes/                   # Route mounting layer
│   ├── organisations/
│   └── superadmin/
├── services/                 # Business logic layer, grouped by feature
│   └── {feature}/            # Service files for each feature
├── types/                    # Type definitions (derived via z.infer<>)
│   └── *.ts
└── utils/                    # Stateless helpers (validation, env, http)
  ├── env/                  # Environment variable reading
  ├── http/                 # HTTP helpers (status codes, headers)
  └── validation/           # Schema validation utilities
```

**Key Principles:**

- Each feature's repositories are only imported by services of the same feature (enforced by eslint-plugin-boundaries).
- Services can import other services for business logic composition.
- Controllers can use any service.
- No more `modules/` folder; features are grouped under `controllers/`, `repositories/`, and `services/`.

## Time Handling

- All backend times are handled as JavaScript `Date` objects and validated/stored as ISO 8601 UTC strings with trailing `Z`.
- The backend does not convert to local time; the frontend is responsible for any local time formatting or conversion.
- See `libs/schemas/time/dateTime.ts` for the shared Zod datetime schema.
- Shared domain/request/response schemas live in `libs/schemas/`; OpenAPI-only schemas and registries may live under `docs/`.
- Routes mount modules via `routes/{module}/`.
- Docs own OpenAPI registration and other documentation-only API descriptions, rather than defining them inside feature modules.

## Architectural Boundaries

Enforced by `eslint-plugin-boundaries` with deny-by-default. **Global types** (`libs`, `utils`, `docs`, `types`, `constants`) may be imported by any module.

| From                     | May import                                                            |
| ------------------------ | --------------------------------------------------------------------- |
| `controllers/{feature}`  | Any service, any global type                                          |
| `services/{feature}`     | Sibling services, same-feature repositories, any global type          |
| `repositories/{feature}` | Only used by same-feature services, any global type                   |
| `routes/{feature}`       | Controllers for same feature, any global type, other routes, `app.ts` |
| `docs/`                  | Other `docs/` files, any global type                                  |
| `libs/`                  | Other `libs/`, `generated/prisma` (Prisma client), global types       |
| `utils/`                 | Other `utils/`, `libs/`, global types                                 |
| `constants/`             | Other `constants/`, `libs/`, `utils/`                                 |
| `types/`                 | Other `types/`, global types                                          |
| `app.ts`, `server.ts`    | Any global type, `routes/`, `docs/` (bootstrap layer)                 |

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

**Note:** End-to-end tests (with real HTTP and DB) may be added in the future.

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

## Naming Conventions

- API field names in request, response, query, and path payloads use snake_case.
- JavaScript and TypeScript variable, function, and parameter names use camelCase.
- API file names under `src/modules/**` and `src/docs/**` use kebab-case.
