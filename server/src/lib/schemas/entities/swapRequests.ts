import z from "zod";
import { organisationBaseSchema } from "./base";

export const swapRequestStatusEnum = z.enum([
  "awaiting_target_response",
  "awaiting_manager_approval",
  "approved",
  "rejected_by_target",
  "rejected_by_manager",
  "expired",
]);

export const swapRequestSchema = organisationBaseSchema.extend({
  original_shift_id: z.string(),
  requesting_staff_id: z.string(),
  target_staff_id: z.string(),
  status: swapRequestStatusEnum.describe(
    "Workflow state managed by the backend as staff and manager decisions are recorded",
  ),
});
