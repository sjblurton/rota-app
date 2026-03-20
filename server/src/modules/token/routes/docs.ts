import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import z from "zod";
import { tokenSchema } from "../../../lib/schemas/queries/token";
import {
  badRequestResponse,
  notFoundResponse,
  unauthorisedResponse,
} from "../../../docs/responses";

const registry = new OpenAPIRegistry();

const swapRequestBodySchema = z.object({
  target_staff_id: z.string().describe("Staff member selected for the swap"),
});

registry.registerPath({
  method: "post",
  path: "/api/t/{token}/decline",
  summary: "Decline a shift",
  description:
    "Declines the shift associated with the provided public staff token.",
  tags: ["Staff"],
  request: {
    params: tokenSchema,
  },
  responses: {
    "204": {
      description: "Shift declined successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

registry.registerPath({
  method: "post",
  path: "/api/t/{token}/swap",
  summary: "Request a shift swap",
  description:
    "Creates a swap request for the shift associated with the provided public staff token.",
  tags: ["Staff"],
  request: {
    params: tokenSchema,
    body: {
      required: true,
      description: "Swap request details",
      content: {
        "application/json": {
          schema: swapRequestBodySchema,
        },
      },
    },
  },
  responses: {
    "204": {
      description: "Swap request created successfully",
    },
    "400": badRequestResponse,
    "401": unauthorisedResponse,
    "404": notFoundResponse,
  },
});

export { registry as tokenOpenApiRegistry };
