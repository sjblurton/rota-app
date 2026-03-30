import { z } from "zod";

import { shiftStatusEnum } from "../constants/status";
import { utcDateTimeSchema } from "../time/dateTime";
import { createdAtBaseSchema } from "./base";

const timeDescription =
  "Datetime in ISO 8601 UTC format with trailing Z, e.g. 2023-01-01T09:00:00Z";

export const shiftsSchema = createdAtBaseSchema.extend({
  staff_id: z.uuid(),
  start_time: utcDateTimeSchema.describe(`Shift start ${timeDescription}`),
  end_time: utcDateTimeSchema.describe(`Shift end ${timeDescription}`),
  status: shiftStatusEnum,
});
