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

export const paginationMetadataOpenApiSchema = registry.register(
  "PaginationMetadata",
  z.object({
    page_number: z
      .number()
      .int()
      .min(1)
      .describe("Current 1-based page number"),
    page_size: z.number().int().min(1).describe("Number of items per page"),
    total_items: z.number().int().min(0).describe("Total matching records"),
    total_pages: z.number().int().min(0).describe("Total available pages"),
  }),
);

export const createPaginatedResponseSchema = (itemSchema: z.ZodType) =>
  z.object({
    items: z.array(itemSchema),
    pagination: paginationMetadataOpenApiSchema,
  });

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
