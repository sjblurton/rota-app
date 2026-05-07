import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { SUPERADMIN_TAG } from '../../../docs/constants/tags'
import { commonErrorResponses } from '../../../docs/errors/responses'
import {
  createOrganisationSchema,
  organisationSchema,
} from '../../../libs/schemas/entities/organisation'
import { ORGANISATIONS_TAG } from './constants/tags'

const postOrganisationsOpenApiRegistry = new OpenAPIRegistry()

const TAGS = [ORGANISATIONS_TAG, SUPERADMIN_TAG]

postOrganisationsOpenApiRegistry.registerPath({
  method: 'post',
  path: OpenApiPaths.OPENAPI_PATHS.SUPERADMIN_ORGANISATIONS,
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

export { postOrganisationsOpenApiRegistry }
