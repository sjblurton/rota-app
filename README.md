# rota-app

Monorepo containing the Rota client and server applications.

## Quick Links

- **API Documentation:**
  - Local: http://localhost:3000/api/v1/docs/
  - Staging: https://rota-app-e45i.onrender.com/api/v1/docs/
- [Server README](server/README.md) — Backend setup and API guide
- [Client README](client/README.md) — Frontend setup guide

## Getting Started

```bash
# Install all dependencies
npm install --workspaces

# Run local development (client and server in separate terminals)
cd client && npm run dev
cd server && npm run dev
```

## Conventions

- Backend API timestamps are ISO 8601 UTC datetimes with a trailing Z suffix.
- Local timezone rendering is a client concern only.

## Naming Conventions

- API field names use snake_case.
- JavaScript and TypeScript variable, function, and parameter names use camelCase.
- API file names under `server/src/modules/**` and `server/src/docs/**` use kebab-case.
