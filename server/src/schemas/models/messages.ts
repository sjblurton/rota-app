import z from "../../docs/zod-openapi";
import { organizationBaseSchema } from "./base";

const messageTypeEnum = z.enum(["sms"]);

export const messageSchema = organizationBaseSchema.extend({
  staff_id: z.string(),
  type: messageTypeEnum,
  content: z.string(),
  sent_at: z.string().default(() => new Date().toISOString()),
});
