import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { commonErrorResponses } from '../../../docs/errors/responses'
import { createStaffSchema, staffSchema } from '../../../libs/schemas/entities/staff'
import { STAFF_TAG } from './constants/tags'

extendZodWithOpenApi(z)

export const postStaffRegistry = new OpenAPIRegistry()

postStaffRegistry.registerPath({
  method: 'post',
  path: '/api/v1/admin/organisations/{organisation_id}/staff',
  tags: [STAFF_TAG],
  summary: 'Create a staff member for an organisation',
  description: [
    'Creates a new staff member for the specified organisation.',
    '\n',
    'Business rules:',
    '- If an email address is provided, it must be unique within the organisation.',
    '- If a phone number is provided, it must be unique within the organisation.',
    '- If both are provided, both must be unique within the organisation.',
    '\n',
    'The endpoint will return a 409 Conflict error if the provided email or phone number already exists for another staff member in the same organisation.',
  ].join('\n'),
  request: {
    params: z.object({
      organisation_id: z.uuid().describe('Organisation UUID'),
    }),
    body: {
      content: {
        'application/json': {
          schema: createStaffSchema,
        },
      },
      required: true,
    },
  },
  responses: {
    201: {
      description: 'Staff member created successfully',
      content: {
        'application/json': {
          schema: staffSchema,
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '401': commonErrorResponses.unauthorisedResponse,
    '409': commonErrorResponses.conflictResponse,
    '403': commonErrorResponses.forbiddenResponse,
  },
  security: [{ BearerAuth: [] }],
})

export const staffOpenApiRegistry = postStaffRegistry
