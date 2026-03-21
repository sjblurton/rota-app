# Client Guidelines

## Scope

- Applies to files under client/.

## Architecture

- Keep rendering and interaction in components.
- Keep orchestration, API access, and persistence in services or integrations.
- Prefer composition and small focused components.
- Keep business rules and transformations in framework-light utilities when possible.
- Avoid circular dependencies.

## React and TypeScript

- Use functional components and hooks.
- Use strict typing and avoid any; use unknown when input type is uncertain.
- Prefer type inference when the type is obvious.
- Use British English spelling in repository-authored prose; keep external contract field names unchanged.

## State and Data

- Use TanStack Query for server state and caching.
- Keep state close to where it is used and lift only when necessary.
- Avoid prop drilling by using context or composition where appropriate.

## Accessibility

- Meet WCAG AA requirements for keyboard access, focus management, and contrast.
- Ensure UI changes pass AXE checks.

## Testing and Reliability

- Add or update tests for every behavioural change.
- Test observable behaviour and contracts, not private implementation details.
- Cover edge cases and failure paths.
- Keep tests deterministic.

## Commands

- Development: cd client && npm run dev
- Lint: cd client && npm run lint
- Type check: cd client && npm run lint:typescript
- Test: cd client && npm run test
- Storybook: cd client && npm run storybook
