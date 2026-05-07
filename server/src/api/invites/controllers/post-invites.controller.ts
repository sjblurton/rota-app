import { type ExpressHandlerContext } from '../../../@types/http'
import { createInviteBodySchema } from '../../../libs/schemas/entities/invite'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import {
  type CreateInviteService,
  createInviteService,
} from '../../../services/invites/create-invite.service'
import {
  getOrganisationByIdService,
  type GetOrganisationByIdServiceType,
} from '../../../services/organisations/get-organisation-by-id.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type PostInvitesInput = ExpressHandlerContext & {
  getOrganisationById?: GetOrganisationByIdServiceType
  createInvite?: CreateInviteService
}

export const postInvitesController = async ({
  request,
  response,
  getOrganisationById = getOrganisationByIdService,
  createInvite = createInviteService,
}: PostInvitesInput) => {
  const { organisation_id: organisationId } = validateAndParse(
    getOrganisationIdParamsSchema,
    request.params,
  )

  const parsedBody = validateAndParse(createInviteBodySchema, request.body)

  await getOrganisationById({ id: organisationId })

  const invite = await createInvite({
    data: {
      organisation_id: organisationId,
      ...parsedBody,
    },
  })

  return response.status(201).json(invite)
}
