import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "./zod-openapi";
import { shiftsSchema } from "../schemas/models/shifts";
import { staffSchema } from "../schemas/models/staff";
import { swapRequestSchema } from "../schemas/models/swapRequests";

const registry = new OpenAPIRegistry();

export const staffOpenApiSchema = registry.register("Staff", staffSchema);

export const shiftOpenApiSchema = registry.register("Shift", shiftsSchema);

export const swapRequestOpenApiSchema = registry.register(
  "SwapRequest",
  swapRequestSchema,
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
