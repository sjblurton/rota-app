import z from "zod";
import { utcDateTimeNowDefaultSchema } from "../time/dateTime";
import { organisationBaseSchema } from "./base";
import { messageTypeEnum } from "../constants/messageType";

export const messageSchema = organisationBaseSchema.extend({
  staff_id: z.uuid(),
  type: messageTypeEnum,
  content: z.string(),
  sent_at: utcDateTimeNowDefaultSchema,
});
