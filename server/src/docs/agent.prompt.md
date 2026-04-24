As the OpenAPI Docs Agent (see AGENT.md), please:

Can we add to these open api docs the discussion above? Summary:
As long as the main resource being updated is the invite, and the side effects are a natural consequence of the state change, your PATCH is RESTful. Just document the behaviour clearly in your API docs.

1. Endpoint Design
   Use PATCH /invites/{id} for accepting an invite.
   The request body should indicate the action, e.g. { status: "accepted" }.
   In the future, allow PATCH with other fields for general invite updates. but for now it's just for accepting invites.
2. Authentication & Validation
   Require Supabase bearer token for authentication.
   Extract the Supabase user from the token.
   Validate:
   Invite exists and matches the id.
   Invite is in "invited" state.
   Invite is not expired.
   Invite has no accepted_by_user_id set.
3. Accepting the Invite
   Update invite:
   Set status to "accepted".
   Set accepted_by_user_id to the authenticated user's id.
   Create a new user:
   Use invite details (email, organisation_id, role).
   Set supabase_user_id to the authenticated user's id.
4. Response Codes
   return 200 OK with the updated invite and user details on success.

Ensure all new or changed API paths are covered by tests in server/src/docs/openapi.test.ts.

Follow all conventions and rules in AGENT.md and update AGENT.md if you find ways to improve or clarify the agent’s responsibilities, rules, or workflow.

After making changes, run lint, type-check, and tests to verify correctness.
