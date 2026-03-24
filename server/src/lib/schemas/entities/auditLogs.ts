import z from "zod";

import { entityTypeEnum } from "../constants/entityTypes";
import { createdAtBaseSchema } from "./base";

export const auditLogsSchema = createdAtBaseSchema.extend({
  entity_type: entityTypeEnum,
  entity_id: z.uuid(),
  action: z.string(),
  performed_by: z.string(),
  details: z.record(z.string(), z.string()),
});
