import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { SUPERADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { organisationSchema } from '../../../libs/schemas/entities/organisation'
import { organisationsPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { ORGANISATIONS_TAG } from './constants/tags'

const getOrganisationsOpenApiRegistry = new OpenAPIRegistry()

getOrganisationsOpenApiRegistry.registerPath({
  method: 'get',
  path: OpenApiPaths.OPENAPI_PATHS.SUPERADMIN_ORGANISATIONS,
  summary: 'Get all organisations',
  description:
    'Retrieves a list of all organisations. Restricted to the owner via `X-Superadmin-Key`.',
  tags: [ORGANISATIONS_TAG, SUPERADMIN_TAG],
  security: [{ SuperadminKey: [] }],
  request: {
    query: organisationsPaginationQuerySchema,
  },
  responses: {
    '200': {
      description: 'List of organisations retrieved successfully',
      content: {
        'application/json': {
          schema: organisationSchema.array(),
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '401': commonErrorResponses.unauthorisedResponse,
    '403': commonErrorResponses.forbiddenResponse,
  },
})

export { getOrganisationsOpenApiRegistry }
