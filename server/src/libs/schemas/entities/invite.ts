import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { MESSAGE_TYPES } from "../../../constants/message-type";
import { ROLES } from "../../../constants/roles";
import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { baseWithTimestampsSchema, userRoleEnum } from "./base";

extendZodWithOpenApi(z);

const inviteStatusEnum = z.enum([
  COMMON_STATUS_NAMES.INVITED,
  COMMON_STATUS_NAMES.ACCEPTED,
  COMMON_STATUS_NAMES.REVOKED,
  COMMON_STATUS_NAMES.EXPIRED,
]);

const inviteContactMethodEnum = z.enum([MESSAGE_TYPES.EMAIL]);

export const inviteSchema = baseWithTimestampsSchema
  .extend({
    email: z.email(),
    organisation_id: z.uuid(),
    invited_by_user_id: z.uuid().nullable().optional(),
    accepted_by_user_id: z.uuid().nullable().optional(),
    role: userRoleEnum.default(ROLES.ADMIN),
    status: inviteStatusEnum.default(COMMON_STATUS_NAMES.INVITED),
    expires_at: z.date(),
    preferred_contact_method: inviteContactMethodEnum.default(MESSAGE_TYPES.EMAIL),
  })
  .openapi({
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "new.user@example.com",
      organisation_id: "123e4567-e89b-12d3-a456-426614174000",
      invited_by_user_id: "123e4567-e89b-12d3-a456-426614174000",
      accepted_by_user_id: "123e4567-e89b-12d3-a456-426614174000",
      status: "invited",
      created_at: "2026-04-20T10:00:00Z",
      updated_at: "2026-04-20T10:00:00Z",
      expires_at: "2026-05-20T10:00:00Z",
      preferred_contact_method: "email",
    },
  });

export const createInviteSchema = inviteSchema.pick({
  organisation_id: true,
  email: true,
  invited_by_user_id: true,
  preferred_contact_method: true,
  role: true,
});

export const createInviteBodySchema = createInviteSchema
  .omit({
    organisation_id: true,
  })
  .extend({
    id: z.uuid().optional().openapi({
      description:
        "Optional ID for testing purposes. If not provided, a new UUID will be generated.",
    }),
  })
  .openapi({
    example: {
      email: "new.user@example.com",
      role: "admin",
    },
  });

export const acceptInviteBodySchema = z
  .object({
    status: z.literal("accepted"),
  })
  .openapi({
    example: { status: "accepted" },
  });

export const updateInviteSchema = inviteSchema.partial().extend({
  id: z.uuid(),
});
