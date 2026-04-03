import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { utcDateTimeNowDefaultSchema } from "../time/dateTime";

extendZodWithOpenApi(z);

export const baseSchema = z.object({
  id: z.uuid(),
});

export const baseWithTimestampsSchema = baseSchema.extend({
  created_at: utcDateTimeNowDefaultSchema,
  updated_at: utcDateTimeNowDefaultSchema,
});
