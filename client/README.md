# Client

Frontend application for the Rota project.

This app is built with TanStack Router and TanStack Query, uses MUI for UI components and theming, and integrates with Supabase authentication.

## Stack

- React 19
- TypeScript (strict)
- TanStack Router (file-based routing)
- TanStack Query (server state)
- MUI
- Axios
- Supabase JS
- Vitest + Testing Library
- Playwright (E2E)
- Storybook + Chromatic

## Quick Start

```bash
cd client
npm install
npm run dev
```

App default URL: `http://localhost:5173`

## Environment Variables

The client expects these environment variables:

- `VITE_API_BASE_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

`VITE_API_BASE_URL` defaults to `http://localhost:3000/api/v1` if not set.

## Scripts

```bash
# Development
npm run dev

# Production build and preview
npm run build
npm run preview

# Unit + Storybook integration tests (Vitest)
npm run test

# End-to-end tests (Playwright)
npm run test:e2e
npm run test:e2e:headed
npm run test:e2e:ui

# Storybook
npm run storybook
npm run build-storybook

# Quality checks
npm run lint
npm run lint:fix
npm run check
npm run typecheck
```

## Architecture

Top-level source layout:

```text
src/
├── components/      # Reusable UI building blocks
├── constants/       # Shared constants
├── features/        # Feature modules (presentation + hooks + stories)
├── hooks/           # Reusable app hooks
├── integrations/    # Framework integration setup (TanStack Query)
├── libs/            # Infrastructure adapters (API, auth, theme)
├── playwright/      # E2E fixtures, mocks, and page objects
├── routes/          # TanStack file-based routes
└── utils/           # Framework-light utilities
```

## Conventions

- Keep rendering in components and orchestration in hooks/services.
- Use TanStack Query for server state.
- Keep tests deterministic and focused on observable behaviour.
- Use British English in repository-authored prose.
- Do not edit `src/routeTree.gen.ts` directly; it is generated.

## Testing Approach

- Unit and hook tests: Vitest + Testing Library.
- Story verification: Storybook tests through `@storybook/addon-vitest`.
- Browser journey tests: Playwright with local auth and API mocking seams.

## Storybook and Chromatic

- Local Storybook: `npm run storybook`
- Build Storybook: `npm run build-storybook`
- Chromatic publish (if configured): `npm run chromatic`

Storybook docs use the same MUI theme wrapper as stories via `.storybook/preview.ts`.
