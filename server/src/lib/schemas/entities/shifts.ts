import z from "zod";
import { utcDateTimeSchema } from "../time/dateTime";
import { createdAtBaseSchema } from "./base";

export const shiftStatusEnum = z.enum([
  "pending",
  "confirmed",
  "declined",
  "swap_requested",
]);

const timeDescription =
  "Datetime in ISO 8601 UTC format with trailing Z, e.g. 2023-01-01T09:00:00Z";

export const shiftsSchema = createdAtBaseSchema.extend({
  staff_id: z.string(),
  start_time: utcDateTimeSchema.describe(`Shift start ${timeDescription}`),
  end_time: utcDateTimeSchema.describe(`Shift end ${timeDescription}`),
  status: shiftStatusEnum,
});
