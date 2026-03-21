---
description: "Use when editing or reviewing server API routes, controllers, services, zod validation, or OpenAPI documentation. Covers REST conventions, schema placement, pagination, and docs/runtime alignment."
applyTo: "server/src/**/*.ts"
---

# API Guidelines

- Keep request, query, and body schemas in `server/src/lib/schemas/**`, not inside route docs files.
- Use query parameters for collection filtering and pagination. Do not use request bodies for GET endpoints.
- When response envelopes repeat, extract reusable OpenAPI helper schemas in `server/src/docs/**`.
- Keep OpenAPI docs aligned with runtime request and response shapes.
- Keep HTTP concerns in routes or controllers and orchestration in services.
- Prefer small, focused changes that preserve the existing module boundaries.
- After changing server API code, run `cd server && npm run lint && npm run lint:typescript`.
