# Orchestrated API Development Prompts

This directory contains prompt templates to standardise and streamline the workflow for planning, documenting, and implementing API changes using the orchestrator, architect, and coder agents.

## How to Use

1. **Kickoff a New Feature or Change**
   - Open `orchestrator-kickoff.prompt.md`.
   - Fill in the feature description, goals, constraints, and any initial notes.
   - Use the checklist to guide the process.
   - Copy the filled-out prompt into the orchestrator agent to start the workflow.

2. **Planning (Orchestrator → Architect)**
   - Use `orchestrator-to-architect.prompt.md` to delegate planning to the architect agent.
   - Architect fills out the required sections and, if the task is too large, suggests a breakdown.

3. **Plan Review (Architect → Orchestrator)**
   - Architect submits the completed plan using `architect-to-orchestrator.prompt.md`.
   - Orchestrator (or reviewer) reviews, requests changes, or approves.

4. **Implementation (Orchestrator → Coder)**
   - After plan approval, use `orchestrator-to-coder.prompt.md` to assign implementation to the coder agent.
   - Coder implements according to the plan, writes tests, and runs all checks.

5. **Code Review (Coder → Orchestrator)**
   - Coder submits completed work using `coder-to-orchestrator.prompt.md`.
   - Orchestrator or reviewer reviews the code and tests before merging.

## Prompt Files

- `orchestrator-kickoff.prompt.md`: Start a new feature/change workflow.
- `orchestrator-to-architect.prompt.md`: Delegate planning to architect.
- `architect-to-orchestrator.prompt.md`: Submit plan for review/approval.
- `orchestrator-to-coder.prompt.md`: Assign implementation to coder.
- `coder-to-orchestrator.prompt.md`: Submit code for review/merge.

## Principles

- Documentation-first: No endpoint is implemented until documentation is complete and reviewed.
- Each task is atomic and focused (plan, document, implement, test, review).
- Automated checks and reviews are mandatory.
- Use British English spelling in all repository-authored prose.

For more details, see PLAN.md and the agent files in `.github/agents/`.
