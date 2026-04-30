import cleanDeep from 'clean-deep'

import type { CreateStaffInput } from '../../@types/staff'
import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type CreateStaffRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  data: CreateStaffInput
}

export const createStaffRepository = async ({ tx = prisma, data }: CreateStaffRepositoryInput) => {
  const cleaned = cleanDeep(data, {
    undefinedValues: true,
  }) as Prisma.StaffCreateInput

  return tx.staff.create({ data: cleaned })
}

export type CreateStaffRepository = typeof createStaffRepository
