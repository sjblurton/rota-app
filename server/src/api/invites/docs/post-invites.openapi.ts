import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi'

import { OpenApiPaths } from '../../../docs/constants/docs.routes'
import { commonErrorResponses } from '../../../docs/errors/responses'
import { createInviteBodySchema, inviteSchema } from '../../../libs/schemas/entities/invite'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import { INVITES_TAG } from './constants/tags'

const superadminInvitesOpenApiRegistry = new OpenAPIRegistry()

superadminInvitesOpenApiRegistry.registerPath({
  method: 'post',
  path: OpenApiPaths.OPENAPI_PATHS.ORGANISATION_INVITES,
  summary: 'Invite a user to an organisation (Superadmin)',
  description:
    'Invites a user to an organisation by email. Restricted to superadmin via `X-Superadmin-Key`. If the user already exists, an invite will not be sent.',
  tags: [INVITES_TAG],
  security: [{ SuperadminKey: [] }],
  request: {
    params: getOrganisationIdParamsSchema,
    body: {
      required: true,
      content: {
        'application/json': {
          schema: createInviteBodySchema,
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'User invited successfully',
      content: {
        'application/json': {
          schema: inviteSchema,
        },
      },
    },
    '400': commonErrorResponses.badRequestResponse,
    '401': commonErrorResponses.unauthorisedResponse,
    '409': commonErrorResponses.conflictResponse,
    '403': commonErrorResponses.forbiddenResponse,
  },
})

export { superadminInvitesOpenApiRegistry }
