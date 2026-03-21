# rota-app

Monorepo containing the Rota client and server applications.

## Date and Time Policy

- Backend API timestamps are ISO 8601 UTC datetimes with a trailing Z suffix.
- Date-time validation is centralised in `server/src/lib/schemas/dateTime.ts` and reused across server schemas.
- Local timezone rendering is a client concern only.
