import z from "../../docs/zod-openapi";
import { createdAtBaseSchema } from "./base";

const shiftStatusEnum = z.enum([
  "pending",
  "confirmed",
  "declined",
  "swap_requested",
]);

export const shiftsSchema = createdAtBaseSchema.extend({
  staff_id: z.string(),
  start_time: z.date(),
  end_time: z.date(),
  status: shiftStatusEnum,
});
