import { z } from "zod";

import { messageTypeEnum } from "../constants/messageType";
import { utcDateTimeNowDefaultSchema } from "../time/dateTime";
import { organisationBaseSchema } from "./base";

export const messageSchema = organisationBaseSchema.extend({
  staff_id: z.uuid(),
  type: messageTypeEnum,
  content: z.string(),
  sent_at: utcDateTimeNowDefaultSchema,
});
