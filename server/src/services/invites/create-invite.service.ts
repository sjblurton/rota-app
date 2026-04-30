import { type CreateInvite } from '../../@types/invites'
import { inviteSchema } from '../../libs/schemas/entities/invite'
import {
  type CreateInviteRepository,
  createInviteRepository,
} from '../../repositories/invites/create-invite-repository'
import {
  type InviteUserByEmailService,
  inviteUserByEmailService,
} from './invite-user-by-email.service'

type CreateInviteServiceInput = {
  data: CreateInvite
  createInvite?: CreateInviteRepository
  inviteUserByEmail?: InviteUserByEmailService
}

export const createInviteService = async ({
  data,
  createInvite = createInviteRepository,
  inviteUserByEmail = inviteUserByEmailService,
}: CreateInviteServiceInput) => {
  const raw = await createInvite({ data })

  const parsedInvite = await inviteSchema.parseAsync(raw)

  await inviteUserByEmail({ data: parsedInvite })

  return parsedInvite
}

export type CreateInviteService = typeof createInviteService
