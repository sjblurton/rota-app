import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { inviteSchema } from '../../../libs/schemas/entities/invite'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import { INVITES_TAG } from './constants/tags'

const getInvitesOpenApiRegistry = new OpenAPIRegistry()

getInvitesOpenApiRegistry.registerPath({
  method: 'get',
  path: OpenApiPaths.OPENAPI_PATHS.INVITE_BY_ID,
  summary: 'Get invite by ID',
  description: 'Retrieves an invite by its ID.',
  tags: [INVITES_TAG],
  security: [],
  request: {
    params: getOrganisationIdParamsSchema,
  },
  responses: {
    '200': {
      description: 'Invite retrieved successfully.',
      content: {
        'application/json': {
          schema: inviteSchema,
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '404': commonErrorResponses.notFoundResponse,
  },
})

export { getInvitesOpenApiRegistry }
