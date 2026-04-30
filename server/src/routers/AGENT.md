# Routers Folder Agent Guide

## Purpose

This folder contains shared router modules and middleware for the backend. It is responsible for:

- Composing and exporting Express routers for use in the main app entrypoint.
- Mounting feature routers from `src/api/{module}/routers`.
- Defining and colocating middleware that is specific to a router or role (e.g. admin, superadmin).

## Guidelines

- Each role or shared router group (e.g. admin, superadmin) should have its own router file (e.g. `admin.router.ts`).
- Middleware that is only used by a specific router or role should be placed in a `middleware/` subfolder next to the router.
- Routers in this folder should:
  - Import feature routers from `src/api/{module}/routers` and mount them at the correct path.
  - Import and use any required middleware (e.g. authentication, authorisation) before mounting feature routers.
  - Export the composed router for use in `src/app.ts` or other entrypoints.
- Do not place business logic, validation, or database access in this folder—only router and middleware composition.
- Do not import services or repositories directly—only controllers and routers from the API modules.
- Keep router and middleware boundaries clear and colocate related middleware with its router.

## Example

```ts
// admin.router.ts
import express from 'express'
import { invitesRouter } from '../../api/invites/routers/invites.router'
import { requireJwtAuth } from './middleware/require-jwt-auth'
const adminRouter = express.Router()
adminRouter.use(requireJwtAuth)
adminRouter.use('/invites', invitesRouter)
export { adminRouter }
```

## Agent Instructions

- When adding or editing routers, always:
  1. Import feature routers from `src/api/{module}/routes`.
  2. Mount them at the correct path and with the correct middleware.
  3. Export the composed router for use in the app.
  4. Place any route-specific middleware in a `middleware/` subfolder.

## See Also

- See AGENTS.md in the repo root for global conventions.
- See server/AGENTS.md for backend-wide rules.
- See src/api/{module}/routers for feature routers.
