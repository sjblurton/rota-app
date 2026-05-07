import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { SUPERADMIN_TAG } from '../../../docs/constants/tags'
// import { PATHS } from '../../../constants/paths' // Unused, remove
import { commonErrorResponses } from '../../../docs/errors/responses'
import {
  createOrganisationSchema,
  organisationSchema,
} from '../../../libs/schemas/entities/organisation'
import { organisationsPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { ORGANISATIONS_TAG } from './constants/tags'

const organisationsOpenApiRegistry = new OpenAPIRegistry()

const TAGS = [ORGANISATIONS_TAG, SUPERADMIN_TAG]

organisationsOpenApiRegistry.registerPath({
  method: 'post',
  path: OpenApiPaths.OPENAPI_PATHS.ORGANISATIONS,
  summary: 'Create an organisation',
  description: 'Creates a new organisation. Restricted to the owner via `X-Superadmin-Key`.',
  tags: TAGS,
  security: [{ SuperadminKey: [] }],
  request: {
    body: {
      required: true,
      content: {
        'application/json': {
          schema: createOrganisationSchema,
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Organisation created successfully',
      content: {
        'application/json': {
          schema: organisationSchema,
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '401': commonErrorResponses.unauthorisedResponse,
    '409': commonErrorResponses.conflictResponse,
    '403': commonErrorResponses.forbiddenResponse,
  },
})

organisationsOpenApiRegistry.registerPath({
  method: 'get',
  path: OpenApiPaths.OPENAPI_PATHS.ORGANISATIONS,
  summary: 'Get all organisations',
  description:
    'Retrieves a list of all organisations. Restricted to the owner via `X-Superadmin-Key`.',
  tags: TAGS,
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

export { organisationsOpenApiRegistry }
