import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "./internal/zod-openapi";
import { shiftsSchema } from "../lib/schemas/entities/shifts";
import { staffSchema } from "../lib/schemas/entities/staff";
import { swapRequestSchema } from "../lib/schemas/entities/swapRequests";
import { auditLogsSchema } from "../lib/schemas/entities/auditLogs";

const registry = new OpenAPIRegistry();

export const staffOpenApiSchema = registry.register("Staff", staffSchema);

export const shiftOpenApiSchema = registry.register("Shift", shiftsSchema);

export const swapRequestOpenApiSchema = registry.register(
  "SwapRequest",
  swapRequestSchema,
);

export const auditLogsOpenApiSchema = registry.register(
  "AuditLog",
  auditLogsSchema,
);

export const tokenResponseSchema = registry.register(
  "TokenResponse",
  z.object({
    link: z
      .url()
      .describe("URL to access the resource in the Rota application"),
  }),
);

export const errorResponseSchema = registry.register(
  "ErrorResponse",
  z.object({
    message: z.string(),
  }),
);

export { registry as docsSchemasRegistry };
