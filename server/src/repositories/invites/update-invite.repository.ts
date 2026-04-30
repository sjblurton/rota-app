import cleanDeep from 'clean-deep'

import { type UpdateInvite } from '../../@types/invites'
import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type UpdateInviteRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  data: UpdateInvite
}

export const updateInviteRepository = async ({
  tx = prisma,
  data,
}: UpdateInviteRepositoryInput) => {
  const { id, ...rest } = data
  const cleaned = cleanDeep(rest, {
    undefinedValues: true,
  }) as Prisma.InviteUpdateInput

  return tx.invite.update({ where: { id }, data: cleaned })
}

export type UpdateInviteRepository = typeof updateInviteRepository
