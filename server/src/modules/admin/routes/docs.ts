import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import type { ZodTypeAny } from "zod";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import {
  shiftOpenApiSchema,
  staffOpenApiSchema,
  swapRequestOpenApiSchema,
} from "../../../docs/schemas";
import z from "zod";
import { shiftsSchema } from "../../../lib/schemas/models/shifts";
import { swapRequestSchema } from "../../../lib/schemas/models/swapRequests";

const registry = new OpenAPIRegistry();

const adminTags: string[] = ["Admin"];

const adminErrorResponses = {
  "400": badRequestResponse,
  "401": unauthorisedResponse,
  "404": notFoundResponse,
} as const;

const successResponse = (schema: ZodTypeAny, description: string) => ({
  "200": {
    description,
    content: {
      "application/json": {
        schema,
      },
    },
  },
});

const staffIdParamsSchema = z.object({
  staffId: z.string().describe("ID of the staff member"),
});

const timeAndShiftFilterQuerySchema = z.object({
  start_time: z
    .date()
    .optional()
    .describe("Filter records that start on or after this ISO datetime"),
  end_time: z
    .date()
    .optional()
    .describe("Filter records that end on or before this ISO datetime"),
  shift_id: z.string().optional().describe("Filter by a specific shift ID"),
});

const shiftsListQuerySchema = timeAndShiftFilterQuerySchema.extend({
  staff_id: z
    .string()
    .optional()
    .describe("Filter by the assigned staff member ID"),
  status: shiftsSchema.shape.status
    .optional()
    .describe("Filter by shift status"),
});

const swapsListQuerySchema = timeAndShiftFilterQuerySchema.extend({
  staff_id: z
    .string()
    .optional()
    .describe("Filter by requesting or target staff member ID"),
  status: swapRequestSchema.shape.status
    .optional()
    .describe("Filter by swap request status"),
});

registry.registerPath({
  method: "get",
  path: "/api/admin/staff",
  summary: "List staff members",
  description:
    "Returns all staff members in the organisation. Requires admin authentication.",
  tags: adminTags,
  responses: {
    ...successResponse(
      staffOpenApiSchema.array(),
      "Staff members returned successfully",
    ),
    ...adminErrorResponses,
  },
});

registry.registerPath({
  method: "get",
  path: "/api/admin/staff/{staffId}",
  summary: "Get staff member details",
  description:
    "Returns the details of a specific staff member. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: staffIdParamsSchema,
  },
  responses: {
    ...successResponse(
      staffOpenApiSchema,
      "Staff member details returned successfully",
    ),
    ...adminErrorResponses,
  },
});

registry.registerPath({
  method: "get",
  path: "/api/admin/shifts",
  summary: "List shifts",
  description:
    "Returns all shifts in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    query: shiftsListQuerySchema,
  },
  responses: {
    ...successResponse(
      shiftOpenApiSchema.array(),
      "Shifts returned successfully",
    ),
    ...adminErrorResponses,
  },
});

registry.registerPath({
  method: "get",
  path: "/api/admin/swaps",
  summary: "List swap requests",
  description:
    "Returns all swap requests in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    query: swapsListQuerySchema,
  },
  responses: {
    ...successResponse(
      swapRequestOpenApiSchema.array(),
      "Swap requests returned successfully",
    ),
    ...adminErrorResponses,
  },
});

export { registry as adminOpenApiRegistry };
