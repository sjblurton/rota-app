import type z from "zod";

import type {
  createInviteBodySchema,
  createInviteSchema,
  inviteSchema,
} from "../libs/schemas/entities/invite";

export type Invite = z.infer<typeof inviteSchema>;

export type CreateInviteBody = z.infer<typeof createInviteBodySchema>;

export type CreateInvite = z.infer<typeof createInviteSchema>;
