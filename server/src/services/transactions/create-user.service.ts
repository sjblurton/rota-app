import type { UpdateInvite } from '../../@types/invites'
import { type CreateUserInput } from '../../@types/user'
import { updateInviteSchema } from '../../libs/schemas/entities/invite'
import { createUserSchema } from '../../libs/schemas/entities/user'
import {
  type AcceptInviteTransaction,
  acceptInviteTransaction,
} from '../../repositories/transactions/accept-invite-transaction'

type CreateUserServiceInput = {
  acceptInvite?: AcceptInviteTransaction
  userData: CreateUserInput
  inviteData: UpdateInvite
}

export const createUserService = async ({
  acceptInvite = acceptInviteTransaction,
  userData,
  inviteData,
}: CreateUserServiceInput) => {
  const parsedUserData = createUserSchema.parse(userData)
  const parsedInviteData = updateInviteSchema.parse(inviteData)

  const user = await acceptInvite({
    inviteUpdateData: parsedInviteData,
    userData: parsedUserData,
  })

  return user
}

export type CreateUserService = typeof createUserService
