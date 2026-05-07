import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type GetStaffByIdRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  staffId: string
}

export const getStaffByIdRepository = async ({
  tx = prisma,
  staffId,
}: GetStaffByIdRepositoryInput) => {
  return tx.staff.findUnique({
    where: { id: staffId },
  })
}

export type GetStaffByIdRepository = typeof getStaffByIdRepository
