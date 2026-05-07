import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { ADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { staffSchema } from '../../../libs/schemas/entities/staff'
import { organisationStaffPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import { STAFF_TAG } from './constants/tags'

const registry = new OpenAPIRegistry()

registry.registerPath({
  method: 'get',
  path: OpenApiPaths.OPENAPI_PATHS.STAFF_BY_ORGANISATION,
  tags: [STAFF_TAG, ADMIN_TAG],
  summary: 'Get all staff members for an organisation',
  description:
    'Retrieves a paginated list of all staff members associated with the specified organisation.',
  request: {
    params: getOrganisationIdParamsSchema,
    query: organisationStaffPaginationQuerySchema,
  },
  responses: {
    200: {
      description: 'List of staff for the organisation',
      content: {
        'application/json': {
          schema: staffSchema.array(),
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '401': commonErrorResponses.unauthorisedResponse,
    '409': commonErrorResponses.conflictResponse,
    '403': commonErrorResponses.forbiddenResponse,
    '404': commonErrorResponses.notFoundResponse,
  },
})

export const getAllOrganisationStaffOpenApiRegistry = registry
