# ESLint Boundaries Agent

## Purpose

This folder contains the configuration and rule definitions for `eslint-plugin-boundaries` in the server codebase. It enforces architectural boundaries and import rules to maintain a clean, modular, and maintainable backend architecture.

## Structure

- **constants.mjs**: Centralises type names, arrays, and constants for boundaries config.
- **elements.mjs**: Defines boundaries elements for ESLint (types, modules, etc).
- **dependencies-*.mjs**: Each file contains a logical group of dependency rules:
  - `dependencies-generated.mjs`: Generated/infra rules
  - `dependencies-global.mjs`: Global types rules
  - `dependencies-feature.mjs`: Feature rules (feature-to-global, feature-to-feature, feature-to-shared)
  - `dependencies-shared.mjs`: Shared rules (shared-to-global, shared-to-shared, shared-to-feature)
  - `dependencies-app.mjs`: App rules (app-to-global, app-to-shared, app-to-feature)
- **dependencies.mjs**: Imports and re-exports all rule groups as a single array for ESLint config.

## Maintenance Guidelines

- **Add new rules** to the appropriate `dependencies-*.mjs` file based on their architectural concern.
- **Update constants** in `constants.mjs` if you add new element types or change naming conventions.
- **Do not use barrel files** (index.ts) for boundaries config; import explicitly from the correct file.
- **Keep rules DRY**: Use `.map()` and arrays for repeated patterns.
- **British English** spelling for comments and documentation.
- **Test changes** by running ESLint and ensuring no unexpected violations.

## Why Boundaries Matter

Boundaries are not just for appeasing ESLint—they are essential for enforcing the architectural decisions and modularity of this codebase. Each boundary rule exists to:

- **Preserve architectural intent**: Prevent shortcuts or anti-patterns that undermine the separation of concerns.
- **Maintain code quality**: Ensure that dependencies flow in the intended direction, avoiding tight coupling and tangled modules.
- **Support maintainability**: Make it easier to reason about, refactor, and scale the codebase over time.
- **Enable safe collaboration**: Help all contributors understand and respect the agreed structure, reducing accidental architectural drift.

**Do not add or relax rules simply to silence ESLint errors.** If a rule is causing friction, first review whether the architectural boundary is still correct, and discuss with the team before making changes. Boundaries are a tool for upholding the architecture, not a hurdle to bypass.

## See Also

- [../AGENTS.md](../AGENTS.md) for monorepo-wide agent and architecture guidelines.
- [eslint-plugin-boundaries documentation](https://github.com/javierbrea/eslint-plugin-boundaries)
