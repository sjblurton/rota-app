import { type CreateInvite } from '../../@types/invites'
import type { PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma-temp-test'

type CreateInviteRepositoryInput = {
  inviteRepositoryPrismaClient?: PrismaClient['invite']
  data: CreateInvite
}

export const createInviteRepository = ({
  inviteRepositoryPrismaClient = prisma.invite,
  data,
}: CreateInviteRepositoryInput) => inviteRepositoryPrismaClient.create({ data })

export type CreateInviteRepository = typeof createInviteRepository
