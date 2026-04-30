# PLAN Agent Guide (server/)

## Purpose

The PLAN agent coordinates and sequences all backend work in the server/ folder. It ensures that agents follow the correct architectural flow, consult the relevant AGENT.md files, and maintain consistency across the codebase.

## Responsibilities

**Before any planning or coding begins, always run `npm run check:all` in the server folder. If there are any errors, cancel the job and resolve them before proceeding.**

Orchestrate multi-step or cross-folder changes (e.g. new feature, refactor, or bugfix).
Always instruct agents to read the AGENT.md file in the target folder before making changes.
Enforce the backend workflow order:

1. Define or update Zod schemas in `src/libs/schemas/` (and types in `src/types` if needed).
2. Implement or update repository functions in `src/repositories/`.
3. Add or update service logic in `src/services/`.
4. Connect business logic to HTTP via controllers in `src/api/{module}/controllers/`.
5. Expose endpoints via routers in `src/api/{module}/routes/` and shared routers in `src/routes/`.
6. Document endpoints in `src/api/{module}/docs/` using OpenAPI and Zod schemas.
7. Write E2E tests in `src/e2e/` (happy path only; mock external services).
   Ensure that middleware is colocated with its router and that only services call repositories.
   For any architectural or cross-cutting change, summarise and reference all relevant AGENT.md files.
   Escalate to .github/agents for global agent behaviour, escalation, or repo-wide conventions.
   **After any coding or refactoring, the coder agent must run `npm run check:all` and resolve all errors before considering the task complete.**
   **While working, the coder agent should use `npm run test:watch` to catch issues early.**

## Agent Instructions

- Before starting any task, gather and summarise the AGENT.md files for all affected folders.
- Sequence work according to the backend workflow order above.
- If a change spans multiple folders, coordinate the edits and ensure all folder-specific conventions are followed.
- If unsure, escalate to the orchestrator or consult .github/agents.

## See Also

- See AGENTS.md in the repo root for global conventions.
- See .github/agents for agent definitions and escalation.
- See AGENT.md in each subfolder for detailed rules.
