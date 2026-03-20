import z from "zod";
import { createdAtBaseSchema } from "./base";

export const entityTypeEnum = z.enum(["shift", "staff", "manager", "swap"]);

export const auditLogsSchema = createdAtBaseSchema.extend({
  entity_type: entityTypeEnum,
  entity_id: z.string(),
  action: z.string(),
  performed_by: z.string(),
  details: z.record(z.string(), z.string()),
});
