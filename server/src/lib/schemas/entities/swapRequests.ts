import z from "zod";

import { swapRequestStatusEnum } from "../constants/status";
import { organisationBaseSchema } from "./base";

export const swapRequestSchema = organisationBaseSchema.extend({
  original_shift_id: z.uuid(),
  requesting_staff_id: z.uuid(),
  target_staff_id: z.uuid(),
  status: swapRequestStatusEnum.describe(
    "Workflow state managed by the backend as staff and manager decisions are recorded",
  ),
});
