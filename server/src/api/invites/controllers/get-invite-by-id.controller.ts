import { type ExpressHandlerContext } from '../../../@types/http'
import { getInviteIdParamsSchema } from '../../../libs/schemas/params/getInviteIdParamsSchema'
import {
  type GetInviteByIdService,
  getInviteByIdService,
} from '../../../services/invites/get-invite-by-id.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type GetInviteByIdController = {
  getInviteById?: GetInviteByIdService
} & ExpressHandlerContext

export const getInviteByIdController = async ({
  request,
  response,
  getInviteById = getInviteByIdService,
}: GetInviteByIdController) => {
  const { invite_id: inviteId } = validateAndParse(getInviteIdParamsSchema, request.params)

  const invite = await getInviteById({ id: inviteId })

  return response.status(200).json(invite)
}
