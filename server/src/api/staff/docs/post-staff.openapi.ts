import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { ADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { createStaffBodySchema, staffSchema } from '../../../libs/schemas/entities/staff'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import { STAFF_TAG } from './constants/tags'

const postStaffRegistry = new OpenAPIRegistry()

postStaffRegistry.registerPath({
  method: 'post',
  path: OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION,
  tags: [STAFF_TAG, ADMIN_TAG],
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
    params: getOrganisationIdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: createStaffBodySchema,
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
