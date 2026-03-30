import { z } from "zod";

export const MESSAGE_TYPES = {
  SMS: "sms",
} as const;

export const messageTypeEnum = z.enum(Object.values(MESSAGE_TYPES));
