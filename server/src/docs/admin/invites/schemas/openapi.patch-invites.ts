import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";

import { PATHS } from "../../../../constants/paths";
import { acceptInviteBodySchema, inviteSchema } from "../../../../libs/schemas/entities/invite";
import { userSchema } from "../../../../libs/schemas/entities/user";
import { INVITES_TAG } from "../../../constants/tags";
import { commonErrorResponses } from "../../../errors/responses";

const invitesOpenApiRegistry = new OpenAPIRegistry();

const patchInvitePath = `${PATHS.apiBaseV1}${PATHS.admin}${PATHS.invites}/{invite_id}`;

invitesOpenApiRegistry.registerPath({
  method: "patch",
  path: patchInvitePath,
  summary: "Accept an invite (Authenticated)",
  description: [
    "Accepts an invite by updating its status to 'accepted'. Turn light mode on to see details better.",
    "",
    "- The request body must be { status: 'accepted' }.",
    "- Only invite acceptance is supported for now; future updates may allow other fields.",
    "- Requires authentication via Supabase bearer token.",
    "- The server will:",
    "  - Validate the invite exists, is in the 'invited' state, is not expired, and has not already been accepted.",
    "  - Create a new user using the invite details and the authenticated user's Supabase id.",
    "  - Set status to 'accepted' and accepted_by_user_id to the authenticated user's id.",
    "- Returns 200 OK with the updated invite and the new user.",
    "- If the invite is expired, already accepted, or otherwise invalid, returns 409 Conflict.",
  ].join("\n"),
  tags: [INVITES_TAG],
  security: [{ BearerAuth: [] }],
  parameters: [
    {
      name: "invite_id",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
      example: "123e4567-e89b-12d3-a456-426614174000",
    },
  ],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: acceptInviteBodySchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Invite accepted successfully. Returns the updated invite and the new user.",
      content: {
        "application/json": {
          schema: z.object({ invite: inviteSchema, user: userSchema.nullable() }),
        },
      },
    },
    "400": commonErrorResponses.badRequestResponse,
    "401": commonErrorResponses.unauthorisedResponse,
    "404": commonErrorResponses.notFoundResponse,
    "409": commonErrorResponses.conflictResponse,
    "403": commonErrorResponses.forbiddenResponse,
  },
});

export { invitesOpenApiRegistry };
