import z from "zod";
import { utcDateTimeNowDefaultSchema } from "../time/dateTime";
import { organisationBaseSchema } from "./base";

const messageTypeEnum = z.enum(["sms"]);

export const messageSchema = organisationBaseSchema.extend({
  staff_id: z.string(),
  type: messageTypeEnum,
  content: z.string(),
  sent_at: utcDateTimeNowDefaultSchema,
});
