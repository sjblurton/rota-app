import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { PATHS } from "../../../constants/paths";
import { inviteSchema, updateInviteStatusSchema } from "../../../libs/schemas/entities/invite";
import { commonErrorResponses } from "../../errors/responses";

const invitesOpenApiRegistry = new OpenAPIRegistry();

const patchInvitePath = `${PATHS.apiBaseV1}${PATHS.invites}/{invite_id}`;

invitesOpenApiRegistry.registerPath({
  method: "patch",
  path: patchInvitePath,
  summary: "Accept or reject an invite (Authenticated)",
  description:
    "Accepts or rejects an invite. Requires a valid bearer token (Supabase authentication). On success, returns the updated invite. Also creates a user if accepted.",
  tags: ["Invites"],
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
          schema: updateInviteStatusSchema,
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Invite updated successfully",
      content: {
        "application/json": {
          schema: inviteSchema,
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
