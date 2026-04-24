import type z from "zod";

import type {
  acceptInviteBodySchema,
  createInviteBodySchema,
  createInviteSchema,
  inviteSchema,
  updateInviteSchema,
} from "../libs/schemas/entities/invite";

export type Invite = z.infer<typeof inviteSchema>;

export type CreateInviteBody = z.infer<typeof createInviteBodySchema>;

export type CreateInvite = z.infer<typeof createInviteSchema>;

export type UpdateInviteBody = z.infer<typeof acceptInviteBodySchema>;

export type UpdateInvite = z.infer<typeof updateInviteSchema>;
