# Copilot Agent Workflow Instructions

## Workflow Requirements

- **Before starting any planning or coding:**
  - Run `npm run check:all` in the root folder. If there are any errors, cancel the job and resolve them before proceeding.
  - Locate and read the nearest `AGENT.md` and `PLAN.agent.md` for folder-specific and workflow rules.

- **While working:**
  - Use `npm run work:watch` in the root folder for rapid feedback and to catch issues early.

- **After making changes:**
  - Run `npm run check:all` again in the root folder and fix any errors before submitting, merging, or marking the task complete.

- **Escalation:**
  - If your change spans multiple folders or is architectural, escalate to the PLAN agent.
  - For repo-wide or complex changes, escalate to the orchestrator agent.

## Agent Reminders

- Never edit code without consulting the relevant `AGENT.md` and `PLAN.agent.md`.
- Never bypass the workflow order defined in `PLAN.agent.md` or `AGENTS.md`.
- Always summarise and reference all relevant `AGENT.md` files in PRs or documentation for cross-folder or architectural changes.

---

These instructions ensure all Copilot agents follow the correct workflow, maintain code quality, and respect project conventions.
