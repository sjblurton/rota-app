import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { baseWithTimestampsSchema } from "./base";

extendZodWithOpenApi(z);

export const inviteStatusEnum = z.enum([
  COMMON_STATUS_NAMES.INVITED,
  COMMON_STATUS_NAMES.ACTIVE,
  COMMON_STATUS_NAMES.INACTIVE,
]);

export const inviteSchema = baseWithTimestampsSchema
  .extend({
    email: z.email(),
    organisation_id: z.uuid(),
    invited_by_user_id: z.uuid(),
    status: inviteStatusEnum.default(COMMON_STATUS_NAMES.INVITED),
  })
  .openapi({
    example: {
      id: "123e4567-e89b-12d3-a456-426614174000",
      email: "new.user@example.com",
      organisation_id: "123e4567-e89b-12d3-a456-426614174000",
      invited_by_user_id: "123e4567-e89b-12d3-a456-426614174000",
      status: "invited",
      created_at: "2026-04-20T10:00:00Z",
      updated_at: "2026-04-20T10:00:00Z",
    },
  });

export const createInviteSchema = inviteSchema
  .pick({
    email: true,
  })
  .openapi({
    example: {
      email: "new.user@example.com",
    },
  });
