import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import {
  createPaginatedResponseSchema,
  shiftOpenApiSchema,
  staffOpenApiSchema,
  swapRequestOpenApiSchema,
  auditLogsOpenApiSchema,
} from "../../../docs/schemas";
import z from "zod";
import {
  staffListQuerySchema,
  shiftsListQuerySchema,
  swapsListQuerySchema,
  auditLogsFilterQuerySchema,
} from "../../../lib/schemas/parameters/filters";

const registry = new OpenAPIRegistry();

const adminTags: string[] = ["Admin"];

const adminErrorResponses = {
  "400": badRequestResponse,
  "401": unauthorisedResponse,
  "404": notFoundResponse,
} as const;

const successResponse = (schema: z.ZodType, description: string) => ({
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

registry.registerPath({
  method: "get",
  path: "/api/admin/staff",
  summary: "List staff members",
  description:
    "Returns all staff members in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    query: staffListQuerySchema,
  },
  responses: {
    ...successResponse(
      createPaginatedResponseSchema(staffOpenApiSchema),
      "Paginated staff members returned successfully",
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
      createPaginatedResponseSchema(shiftOpenApiSchema),
      "Paginated shifts returned successfully",
    ),
    ...adminErrorResponses,
  },
});
registry.registerPath({
  method: "get",
  path: "/api/admin/audit-logs",
  summary: "List audit logs",
  description:
    "Returns audit logs for all events in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    query: auditLogsFilterQuerySchema,
  },
  responses: {
    ...successResponse(
      createPaginatedResponseSchema(auditLogsOpenApiSchema),
      "Paginated audit logs returned successfully",
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
      createPaginatedResponseSchema(swapRequestOpenApiSchema),
      "Paginated swap requests returned successfully",
    ),
    ...adminErrorResponses,
  },
});

export { registry as adminOpenApiRegistry };
