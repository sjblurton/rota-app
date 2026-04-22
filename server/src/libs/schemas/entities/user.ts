import z from "zod";

import { COMMON_STATUS_NAMES } from "../../../constants/status";
import { baseWithTimestampsSchema, userRoleEnum } from "./base";

export const userSchema = baseWithTimestampsSchema.extend({
  id: z.uuid(),
  email: z.email(),
  name: z.string(),
  supabase_user_id: z.string(),
  role: userRoleEnum,
  organisation_id: z.uuid(),
  status: z.enum([
    COMMON_STATUS_NAMES.ACTIVE,
    COMMON_STATUS_NAMES.INACTIVE,
    COMMON_STATUS_NAMES.INVITED,
  ]),
  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});
