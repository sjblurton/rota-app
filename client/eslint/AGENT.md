# Client ESLint Rules Agent

## Purpose

This folder owns custom ESLint plugin wiring and rule implementations for the client app.
All custom rule work in this folder must follow strict TDD using red-green-refactor.

## Scope

- Applies to files under client/eslint/.
- Includes plugin registration, custom rules, and rule tests.

## Mandatory Workflow

Before starting planning or coding:

- Run npm run check:all from the repository root.
- Read client/AGENTS.md and this file.

While working:

- Use npm run work:watch from the repository root for fast feedback when useful.
- Keep changes focused and avoid unrelated refactors.

After making changes:

- Run npm run check:all from the repository root and fix all errors.

## TDD Rules (Required)

For every new rule or rule behaviour change:

1. Write or update the rule test first.
2. Run the targeted test and confirm it fails (red).
3. Implement the minimum rule change to make the test pass (green).
4. Refactor without changing behaviour.
5. Re-run targeted tests and full rule tests.

Do not implement rule logic before a failing test exists.
Do not skip the explicit red step.

## Rule and Test Conventions

- Keep one primary test file per rule in client/eslint/rules/.
- Prefer descriptive test names that state expected behaviour.
- Use realistic code snippets in tests that match React component and route usage.
- Reuse shared utilities from client/eslint/rules/utils/ where possible.
- Add or update utility tests when utility behaviour changes.

## Quality Gates

Minimum checks for custom rule changes:

- npm --prefix client run test -- eslint/rules/
- npm --prefix client run lint
- npm run check:all

A task is not complete until all checks pass.

## Design Principles

- Keep rules small, readable, and deterministic.
- Prefer early returns and explicit branching.
- Avoid false positives in non-target files and non-target symbols.
- Preserve British English spelling in repository-authored prose.

## See Also

- ../AGENTS.md
- ../../AGENTS.md
- ../../.github/copilot-instructions.md
