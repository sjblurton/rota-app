import { extendZodWithOpenApi, type ResponseConfig } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

extendZodWithOpenApi(z)

const errorResponseSchema = z.object({
  message: z.string().describe('Error message'),
  details: z.string().optional(),
})

const unauthorisedResponse: ResponseConfig = {
  description: 'Unauthorised — token is missing, expired, or invalid',
  content: {
    'application/json': {
      schema: errorResponseSchema,
      examples: {
        unauthorised: {
          summary: 'Example unauthorised response',
          value: {
            message: 'Unauthorised',
          },
        },
      },
    },
  },
} as const

const badRequestResponse: ResponseConfig = {
  description: 'Bad request — invalid or missing parameters',
  content: {
    'application/json': {
      schema: errorResponseSchema,
      examples: {
        badRequest: {
          summary: 'Example bad request response',
          value: {
            message: 'Bad Request',
          },
        },
      },
    },
  },
} as const

const notFoundResponse: ResponseConfig = {
  description: 'Not found — the requested resource does not exist',
  content: {
    'application/json': {
      schema: errorResponseSchema,
      examples: {
        notFound: {
          summary: 'Example not found response',
          value: {
            message: 'Not Found',
          },
        },
      },
    },
  },
} as const

const forbiddenResponse: ResponseConfig = {
  description: 'Forbidden — the client does not have access rights to the content',
  content: {
    'application/json': {
      schema: errorResponseSchema,
      examples: {
        forbidden: {
          summary: 'Example forbidden response',
          value: {
            message: 'Forbidden',
          },
        },
      },
    },
  },
} as const

const conflictResponse: ResponseConfig = {
  description: 'Conflict — request conflicts with the current workflow state',
  content: {
    'application/json': {
      schema: errorResponseSchema,
      examples: {
        conflict: {
          summary: 'Example conflict response',
          value: {
            message: 'Conflict',
          },
        },
      },
    },
  },
} as const

export const commonErrorResponses = {
  badRequestResponse,
  unauthorisedResponse,
  notFoundResponse,
  conflictResponse,
  forbiddenResponse,
} as const
