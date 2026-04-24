import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";

import { PATHS } from "../../../../constants/paths";
import { createInviteBodySchema, inviteSchema } from "../../../../libs/schemas/entities/invite";
import { INVITES_TAG } from "../../../constants/tags";
import { commonErrorResponses } from "../../../errors/responses";
import { SUPERADMIN_TAG } from "../../constants/superadmin-tags";

const superadminInvitesOpenApiRegistry = new OpenAPIRegistry();

const inviteUserPath = `${PATHS.apiBaseV1}${PATHS.superadmin}${PATHS.organisations}/{organisation_id}/invites`;

superadminInvitesOpenApiRegistry.registerPath({
  method: "post",
  path: inviteUserPath,
  parameters: [
    {
      name: "organisation_id",
      example: "00000000-0000-0000-0000-000000000000",
      in: "path",
      required: true,
      schema: {
        type: "string",
        format: "uuid",
      },
    },
  ],
  summary: "Invite a user to an organisation (Superadmin)",
  description:
    "Invites a user to an organisation by email. Restricted to superadmin via `X-Superadmin-Key`. If the user already exists, an invite will not be sent.",
  tags: [SUPERADMIN_TAG, INVITES_TAG],
  security: [{ SuperadminKey: [] }],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createInviteBodySchema,
        },
      },
    },
  },
  responses: {
    "201": {
      description: "User invited successfully",
      content: {
        "application/json": {
          schema: inviteSchema,
        },
      },
    },
    "400": commonErrorResponses.badRequestResponse,
    "401": commonErrorResponses.unauthorisedResponse,
    "409": commonErrorResponses.conflictResponse,
    "403": commonErrorResponses.forbiddenResponse,
  },
});

export { superadminInvitesOpenApiRegistry };
