# Client ESLint Boundaries Agent

## Purpose

This folder contains the configuration and rule definitions for `eslint-plugin-boundaries` in the client codebase. It enforces architectural boundaries and import rules to maintain a clean, modular, and maintainable frontend architecture.

## Structure

The boundaries configuration is split into focused, single-responsibility files:

- **constants.mjs**: Centralises element type names, file patterns, and reusable arrays to avoid duplication.
- **elements.mjs**: Defines boundaries elements for ESLint (8 layers: app, routes-root, routes, components-singleton, components, hooks, integrations, libs).
- **dependencies-\*.mjs**: Each file contains all dependency rules for one architectural layer:
  - `dependencies-app.mjs`: App (entry point) rules — can import all lower layers
  - `dependencies-routes.mjs`: Routes-root and routes rules — can import components, hooks, integrations, libs
  - `dependencies-components.mjs`: Components and components-singleton rules — can import hooks, integrations, libs
  - `dependencies-hooks.mjs`: Hooks rules — can import hooks, integrations, libs
  - `dependencies-integrations.mjs`: Integrations rules — can import integrations, libs
  - `dependencies-libs.mjs`: Libs rules — can only import libs
- **dependencies.mjs**: Imports and re-exports all dependency rule groups as a single array for ESLint config.

## Architectural Layers

The client ESLint boundaries enforce a unidirectional dependency hierarchy:

| Layer                    | Purpose                            | Can Import From                                                     |
| ------------------------ | ---------------------------------- | ------------------------------------------------------------------- |
| **app**                  | Router entry points                | All layers                                                          |
| **routes-root**          | Root route files                   | routes, components-singleton, components, hooks, integrations, libs |
| **routes**               | Nested route modules               | Same-module routes, components, hooks, integrations, libs           |
| **components-singleton** | Shared UI (e.g., ApiErrorSnackbar) | components, hooks, integrations, libs                               |
| **components**           | General UI components              | components, hooks, integrations, libs                               |
| **hooks**                | Custom React hooks and logic       | hooks, integrations, libs                                           |
| **integrations**         | External library wrappers          | integrations, libs                                                  |
| **libs**                 | Pure utilities and services        | libs only                                                           |

**Key constraints:**

- Routes can only depend within their own module (enforced via `moduleName` capture).
- No circular dependencies across layers.
- Components are the UI foundation (hooks depend downward, never upward).
- Integrations wrap external concerns and are isolated from UI layers.
- Libs are pure and dependency-free.

## Maintenance Guidelines

- **Add new rules**: Place them in the appropriate `dependencies-*.mjs` file based on which layer they affect.
- **Update constants**: If you add new element types or change naming conventions, update `constants.mjs` first.
- **Do not use barrel files**: Import explicitly from the correct file (e.g., `./constants.mjs`, not from folder).
- **Keep rules DRY**: Use arrays and `.map()` for repeated patterns; extract to constants if reused.
- **Use British English**: Spelling and phrasing in comments and documentation.
- **Test changes**: Run `npm run lint` from the client folder and ensure no unexpected violations appear.

## Why Boundaries Matter

Boundaries are not just for appeasing ESLint—they are essential for enforcing the architectural decisions and modularity of this codebase. Each boundary rule exists to:

- **Preserve architectural intent**: Prevent shortcuts or anti-patterns that undermine the separation of concerns.
- **Maintain code quality**: Ensure that dependencies flow in the intended direction, avoiding tight coupling and tangled modules.
- **Support maintainability**: Make it easier to reason about, refactor, and scale the codebase over time.
- **Enable safe collaboration**: Help all contributors understand and respect the agreed structure, reducing accidental architectural drift.

**Do not add or relax rules simply to silence ESLint errors.** If a rule is causing friction, first review whether the architectural boundary is still correct, and discuss with the team before making changes. Boundaries are a tool for upholding the architecture, not a hurdle to bypass.

## See Also

- [../AGENT.md](../AGENT.md) for custom ESLint rule development and testing.
- [../../client/AGENTS.md](../../client/AGENTS.md) for client-wide conventions and commands.
- [../../AGENTS.md](../../AGENTS.md) for monorepo-wide architecture guidelines.
- [eslint-plugin-boundaries documentation](https://github.com/javierbrea/eslint-plugin-boundaries)
