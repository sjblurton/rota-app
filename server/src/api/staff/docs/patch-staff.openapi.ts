import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { ADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { staffSchema, updateStaffSchema } from '../../../libs/schemas/entities/staff'
import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import { STAFF_TAG } from './constants/tags'

const patchStaffRegistry = new OpenAPIRegistry()

patchStaffRegistry.registerPath({
  method: 'patch',
  path: OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID,
  tags: [STAFF_TAG, ADMIN_TAG],
  summary: 'Update staff member for an organisation',
  description: [
    'Updates staff member.',
    '\n',
    'Business rules:',
    '- Only the fields provided will be updated.',
    '- Email and phone number must remain unique within the organisation.',
    '- If both are provided, both must be unique within the organisation.',
    '\n',
    'The endpoint will return a 409 Conflict error if the provided email or phone number already exists for another staff member in the same organisation.',
  ].join('\n'),
  request: {
    params: getStaffIdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateStaffSchema,
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
