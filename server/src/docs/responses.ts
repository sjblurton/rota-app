import { errorResponseSchema } from "./schemas";

export const unauthorisedResponse = {
  description: "Unauthorised — token is missing, expired, or invalid",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      examples: {
        missing: {
          summary: "Token missing",
          value: { message: "Token is required" },
        },
        expired: {
          summary: "Token expired",
          value: { message: "Token has expired" },
        },
        invalid: {
          summary: "Token invalid",
          value: { message: "Token is invalid" },
        },
      },
    },
  },
} as const;

export const badRequestResponse = {
  description: "Bad request — invalid or missing parameters",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      example: {
        message: "Invalid request parameters",
        error_details: "name: Invalid input: expected string, received undefined",
      },
    },
  },
} as const;

export const notFoundResponse = {
  description: "Not found — the requested resource does not exist",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      example: {
        message: "Resource not found",
      },
    },
  },
} as const;

export const conflictResponse = {
  description: "Conflict — request conflicts with the current workflow state",
  content: {
    "application/json": {
      schema: errorResponseSchema,
      example: {
        message:
          "Swap request is no longer in a state that allows this decision",
      },
    },
  },
} as const;
