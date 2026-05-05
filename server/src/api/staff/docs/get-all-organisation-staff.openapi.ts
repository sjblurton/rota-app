import { extendZodWithOpenApi, OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'
import { z } from 'zod'

import { commonErrorResponses } from '../../../docs/errors/responses'
import { staffSchema } from '../../../libs/schemas/entities/staff'
import { organisationStaffPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { STAFF_TAG } from './constants/tags'

extendZodWithOpenApi(z)

const registry = new OpenAPIRegistry()

registry.registerPath({
  method: 'get',
  path: '/api/v1/admin/organisations/{organisation_id}/staff',
  tags: [STAFF_TAG],
  summary: 'Get all staff members for an organisation',
  description:
    'Retrieves a paginated list of all staff members associated with the specified organisation.',
  request: {
    params: z.object({ organisation_id: z.uuid().describe('Organisation UUID') }),
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
