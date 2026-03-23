import z from "zod";
import { organisationBaseSchema } from "./base";
import { swapRequestStatusEnum } from "../constants/status";

export const swapRequestSchema = organisationBaseSchema.extend({
  original_shift_id: z.uuid(),
  requesting_staff_id: z.uuid(),
  target_staff_id: z.uuid(),
  status: swapRequestStatusEnum.describe(
    "Workflow state managed by the backend as staff and manager decisions are recorded",
  ),
});
