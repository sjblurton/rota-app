---
description: "Use when editing or reviewing server API routers, controllers, services, zod validation, or OpenAPI documentation. Covers REST conventions, schema placement, pagination, and docs/runtime alignment."
applyTo: "server/src/**/*.ts"
---

# API Guidelines

- Keep request, query, and body schemas in `server/src/libs/schemas/**`, not inside router docs files.
- Use ISO 8601 UTC datetimes with trailing Z for API contracts and convert to local time only in client UI.
- Reuse shared date-time schemas from `server/src/lib/schemas/dateTime.ts` instead of redefining date validators.
- Use snake_case for API field names in request, response, query, and path payloads.
- Use camelCase for JavaScript and TypeScript variable, function, and parameter names.
- Use kebab-case for API file names under `server/src/modules/**` and `server/src/docs/**`, and plural form for folders: `controllers/`, `services/`, `routers/`.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.
- Use query parameters for collection filtering and pagination. Do not use request bodies for GET endpoints.
- When response envelopes repeat, extract reusable OpenAPI helper schemas in `server/src/docs/**`.
- Keep OpenAPI docs aligned with runtime request and response shapes.
- Keep HTTP concerns in routers or controllers and orchestration in services.
- Prefer small, focused changes that preserve the existing module boundaries.
- After changing server API code, run `cd server && npm run lint && npm run lint:typescript`.
