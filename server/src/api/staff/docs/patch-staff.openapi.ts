import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { commonErrorResponses } from '../../../docs/errors/responses'
import { patchStaffBodySchema, staffSchema } from '../../../libs/schemas/entities/staff'
import { STAFF_TAG } from './constants/tags'

extendZodWithOpenApi(z)

export const patchStaffRegistry = new OpenAPIRegistry()

const patchStaffParamsSchema = z.object({
  organisation_id: z.uuid().describe('Organisation UUID'),
})

patchStaffRegistry.registerPath({
  method: 'patch',
  path: '/api/v1/admin/organisations/{organisation_id}/staff',
  tags: [STAFF_TAG],
  summary: 'Update staff member(s) for an organisation',
  description: [
    'Updates one or more staff members for the specified organisation.',
    '\n',
    'Business rules:',
    '- Only the fields provided will be updated.',
    '- Email and phone number must remain unique within the organisation.',
    '- If both are provided, both must be unique within the organisation.',
    '\n',
    'The endpoint will return a 409 Conflict error if the provided email or phone number already exists for another staff member in the same organisation.',
  ].join('\n'),
  request: {
    params: patchStaffParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: patchStaffBodySchema,
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Staff member updated successfully',
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
    '404': commonErrorResponses.notFoundResponse,
  },
  security: [{ BearerAuth: [] }],
})

export const staffPatchOpenApiRegistry = patchStaffRegistry
