# API Development Plan

This file documents the orchestrated workflow for planning, documenting, and implementing new API endpoints in this repository.

## Workflow Steps

1. **Plan Endpoint (Architect Agent)**
   - Define the new endpoint's purpose, resource model, and behaviour.
   - Specify required OpenAPI documentation updates, including endpoint path, method, request/response schemas, and examples.
   - Reference or propose Zod schemas and OpenAPI patterns to be used or created.
   - Output: A clear, reviewed plan for the endpoint and its documentation.

2. **Write Documentation (Coder Agent)**
   - Create or update OpenAPI documentation and Zod schemas as specified in the plan.
   - Ensure all schemas are reusable, consistent, and live in the correct locations.
   - Output: Documentation and schemas ready for implementation.

3. **Implement Endpoint (Coder Agent)**
   - Implement the endpoint using the planned documentation and schemas as the source of truth.
   - Write or update automated tests for all new code.
   - Output: Endpoint code and tests.

4. **Run Checks (Coder Agent)**
   - Run `npm run check:all` before and after implementation.
   - Do not proceed or submit code unless all checks pass.

5. **Review & Iterate (Orchestrator/Reviewer Agent)**
   - Review the plan, documentation, code, and tests.
   - Request changes or approve as needed.

## Principles

- Documentation-first: No endpoint is implemented until documentation is complete and reviewed.
- Separation of concerns: Planning, documentation, and implementation are distinct tasks.
- Automated testing and checks are mandatory for all changes.
- Use British English spelling in all repository-authored prose.

## Roles

- **Architect Agent:** Plans endpoints and documentation.
- **Coder Agent:** Implements documentation, schemas, code, and tests.
- **Orchestrator Agent:** Sequences and assigns tasks, ensures workflow is followed.

For more details, see the respective agent files in `.github/agents/`.
