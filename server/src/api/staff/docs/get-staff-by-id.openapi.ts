import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { ADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { staffSchema } from '../../../libs/schemas/entities/staff'
import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import { STAFF_TAG } from './constants/tags'

extendZodWithOpenApi(z)

const getStaffRegistry = new OpenAPIRegistry()

getStaffRegistry.registerPath({
  method: 'get',
  path: OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ID,
  tags: [STAFF_TAG, ADMIN_TAG],
  summary: 'Get staff member by ID',
  description: 'Retrieves a staff member by their unique ID.',
  request: {
    params: getStaffIdParamsSchema,
  },
  responses: {
    200: {
      description: 'Staff member retrieved successfully',
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

export const getStaffOpenApiRegistry = getStaffRegistry
