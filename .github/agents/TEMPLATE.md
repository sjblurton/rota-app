# .github/agents Template

## Purpose

Defines global agent roles, escalation paths, and agent behaviour for the repository. Ensures all agents coordinate, consult folder-level AGENT.md files, and follow repo-wide conventions.

## Agent Roles

- **PLAN agent**: Coordinates multi-step and cross-folder changes. Reads and summarises all relevant AGENT.md files. Sequences work according to the backend workflow order. Escalates to orchestrator if needed.
- **Orchestrator agent**: Handles complex, repo-wide, or architectural changes. Delegates tasks to specialist agents. Ensures all folder and global conventions are followed.
- **Coder agent**: Implements code changes in a single folder. Always reads the nearest AGENT.md before editing. Escalates to PLAN agent for cross-folder or architectural work.
- **Reviewer agent**: Reviews PRs and code changes for adherence to AGENT.md and repo conventions. Flags violations and requests corrections.

## Agent Instructions

**Before starting any planning or coding, run the project’s full check script (`npm run check:all` in the server folder) and abort if errors are found.**

Before making changes, always:
  1. Locate and read the nearest AGENT.md for the target folder.
  2. If the change spans multiple folders, escalate to the PLAN agent.
  3. If the change is architectural or repo-wide, escalate to the orchestrator agent.
  4. Summarise and reference all relevant AGENT.md files in PRs or documentation.
**After making changes, always run `npm run check:all` and fix any errors before submitting or merging.**
**Use `npm run test:watch` during development for rapid feedback.**
Agents must not:
  - Edit code without consulting the relevant AGENT.md.
  - Bypass the workflow order defined in PLAN.agent.md or AGENTS.md.

## Escalation Path

- Coder → PLAN agent (for cross-folder) → Orchestrator (for repo-wide/architecture)

## See Also

- AGENTS.md in the repo root for global conventions.
- PLAN.agent.md in each app/server for workflow order.
- AGENT.md in each folder for detailed rules.
