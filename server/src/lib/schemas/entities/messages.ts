import z from "zod";
import { utcDateTimeNowDefaultSchema } from "../dateTime";
import { organizationBaseSchema } from "./base";

const messageTypeEnum = z.enum(["sms"]);

export const messageSchema = organizationBaseSchema.extend({
  staff_id: z.string(),
  type: messageTypeEnum,
  content: z.string(),
  sent_at: utcDateTimeNowDefaultSchema,
});
