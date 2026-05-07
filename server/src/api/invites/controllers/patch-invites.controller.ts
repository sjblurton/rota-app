import { type ExpressHandlerContext } from '../../../@types/http'
import { acceptInviteBodySchema } from '../../../libs/schemas/entities/invite'
import { getInviteIdParamsSchema } from '../../../libs/schemas/params/getInviteIdParamsSchema'
import {
  type AcceptInviteService,
  acceptInviteService,
} from '../../../services/invites/accept-invite.service'
import { HttpErrorByCode } from '../../../utils/http/HttpErrorByCode'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type PatchInvitesControllerInput = {
  acceptInvite?: AcceptInviteService
} & ExpressHandlerContext

export const patchInvitesController = async ({
  request,
  response,
  acceptInvite = acceptInviteService,
}: PatchInvitesControllerInput) => {
  const { invite_id: inviteId } = validateAndParse(getInviteIdParamsSchema, request.params)
  const body = validateAndParse(acceptInviteBodySchema, request.body)
  const user = request.superbaseUser

  if (!user) {
    throw new HttpErrorByCode('unauthorised', 'Authentication required')
  }

  const results = await acceptInvite({
    supabaseUserId: user.id,
    inviteId,
    body,
  })

  return response.status(200).json(results)
}
