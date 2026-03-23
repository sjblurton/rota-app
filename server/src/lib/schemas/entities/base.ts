import z from "zod";
import { utcDateTimeNowDefaultSchema } from "../time/dateTime";

export const baseSchema = z.object({
  id: z.uuid(),
});

export const organisationBaseSchema = baseSchema.extend({
  organisation_id: z.uuid(),
});

export const createdAtBaseSchema = baseSchema.extend({
  created_at: utcDateTimeNowDefaultSchema,
});
