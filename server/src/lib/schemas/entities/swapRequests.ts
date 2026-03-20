import z from "zod";
import { organizationBaseSchema } from "./base";

const swapRequestStatusEnum = z.enum(["pending", "accepted", "rejected"]);

export const swapRequestSchema = organizationBaseSchema.extend({
  original_shift_id: z.string(),
  requesting_staff_id: z.string(),
  target_staff_id: z.string(),
  status: swapRequestStatusEnum,
});
