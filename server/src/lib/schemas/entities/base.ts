import z from "zod";
import { utcDateTimeNowDefaultSchema } from "../dateTime";

export const baseSchema = z.object({
  id: z.string(),
});

export const organizationBaseSchema = baseSchema.extend({
  organization_id: z.string(),
});

export const createdAtBaseSchema = baseSchema.extend({
  created_at: utcDateTimeNowDefaultSchema,
});
