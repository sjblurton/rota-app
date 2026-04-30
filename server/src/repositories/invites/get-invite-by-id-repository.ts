import { type PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type GetInviteByIdRepositoryInput = {
  inviteRepositoryPrismaClient?: PrismaClient['invite']
  id: string
}

export const getInviteByIdRepository = async ({
  inviteRepositoryPrismaClient = prisma['invite'],
  id,
}: GetInviteByIdRepositoryInput) => inviteRepositoryPrismaClient.findUnique({ where: { id } })

export type GetInviteByIdRepository = typeof getInviteByIdRepository
