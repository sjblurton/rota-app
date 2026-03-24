import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import type z from "zod";

import {
  badRequestResponse,
  conflictResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";
import {
  auditLogsOpenApiSchema,
  createPaginatedResponseSchema,
  shiftOpenApiSchema,
  staffOpenApiSchema,
  swapRequestOpenApiSchema,
} from "../../../docs/schemas";
import {
  auditLogsFilterQuerySchema,
  shiftsListQuerySchema,
  staffListQuerySchema,
  swapsListQuerySchema,
} from "../../../lib/schemas/parameters/filters/query";
import {
  shiftIdParamSchema,
  staffIdParamSchema,
  swapIdParamSchema,
} from "../../../lib/schemas/parameters/ids/params";
import {
  createShiftBodySchema,
  createStaffBodySchema,
  swapManagerDecisionBodySchema,
  updateShiftBodySchema,
  updateStaffBodySchema,
} from "../../../lib/schemas/parameters/inputs/schemas";

const registry = new OpenAPIRegistry();

registry.registerComponent("securitySchemes", "ManagerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
  description: "Manager access token. Required for all admin endpoints.",
});

const adminTags: string[] = ["Admin"];

const adminSecurity = [{ ManagerAuth: [] }];

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

const createdResponse = (schema: z.ZodType, description: string) => ({
  "201": {
    description,
    content: {
      "application/json": {
        schema,
      },
    },
  },
});

const registerAdminPath = (path: Parameters<typeof registry.registerPath>[0]) =>
  registry.registerPath({
    ...path,
    tags: adminTags,
    security: adminSecurity,
  });

registerAdminPath({
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

registerAdminPath({
  method: "post",
  path: "/api/admin/staff",
  summary: "Create staff member",
  description:
    "Creates a new staff member in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    body: {
      required: true,
      description: "Staff member details",
      content: {
        "application/json": {
          schema: createStaffBodySchema,
        },
      },
    },
  },
  responses: {
    ...createdResponse(staffOpenApiSchema, "Staff member created successfully"),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "get",
  path: "/api/admin/staff/{staff_id}",
  summary: "Get staff member details",
  description:
    "Returns the details of a specific staff member. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: staffIdParamSchema,
  },
  responses: {
    ...successResponse(
      staffOpenApiSchema,
      "Staff member details returned successfully",
    ),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "patch",
  path: "/api/admin/staff/{staff_id}",
  summary: "Update staff member",
  description:
    "Updates a staff member in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: staffIdParamSchema,
    body: {
      required: true,
      description: "Staff fields to update",
      content: {
        "application/json": {
          schema: updateStaffBodySchema,
        },
      },
    },
  },
  responses: {
    ...successResponse(staffOpenApiSchema, "Staff member updated successfully"),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "delete",
  path: "/api/admin/staff/{staff_id}",
  summary: "Delete staff member",
  description:
    "Deletes a staff member from the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: staffIdParamSchema,
  },
  responses: {
    "204": {
      description: "Staff member deleted successfully",
    },
    ...adminErrorResponses,
  },
});

registerAdminPath({
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

registerAdminPath({
  method: "post",
  path: "/api/admin/shifts",
  summary: "Create shift",
  description:
    "Creates a new shift in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    body: {
      required: true,
      description: "Shift details",
      content: {
        "application/json": {
          schema: createShiftBodySchema,
        },
      },
    },
  },
  responses: {
    ...createdResponse(shiftOpenApiSchema, "Shift created successfully"),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "get",
  path: "/api/admin/shifts/{shift_id}",
  summary: "Get shift details",
  description:
    "Returns details for a specific shift. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: shiftIdParamSchema,
  },
  responses: {
    ...successResponse(
      shiftOpenApiSchema,
      "Shift details returned successfully",
    ),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "patch",
  path: "/api/admin/shifts/{shift_id}",
  summary: "Update shift",
  description:
    "Updates a shift in the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: shiftIdParamSchema,
    body: {
      required: true,
      description: "Shift fields to update",
      content: {
        "application/json": {
          schema: updateShiftBodySchema,
        },
      },
    },
  },
  responses: {
    ...successResponse(shiftOpenApiSchema, "Shift updated successfully"),
    ...adminErrorResponses,
  },
});

registerAdminPath({
  method: "delete",
  path: "/api/admin/shifts/{shift_id}",
  summary: "Delete shift",
  description:
    "Deletes a shift from the organisation. Requires admin authentication.",
  tags: adminTags,
  request: {
    params: shiftIdParamSchema,
  },
  responses: {
    "204": {
      description: "Shift deleted successfully",
    },
    ...adminErrorResponses,
  },
});

registerAdminPath({
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

registerAdminPath({
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

registerAdminPath({
  method: "patch",
  path: "/api/admin/swaps/{swap_id}",
  summary: "Review swap request",
  description:
    "Allows a manager to approve or reject a swap request after the target staff member has accepted it. The backend advances the workflow state based on this decision.",
  tags: adminTags,
  request: {
    params: swapIdParamSchema,
    body: {
      required: true,
      description: "Manager decision for the accepted swap request",
      content: {
        "application/json": {
          schema: swapManagerDecisionBodySchema,
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Manager decision recorded successfully",
    },
    "409": conflictResponse,
    ...adminErrorResponses,
  },
});

export { registry as adminOpenApiRegistry };
