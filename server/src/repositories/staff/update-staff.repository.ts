import cleanDeep from 'clean-deep'

import type { UpdateStaffInput } from '../../@types/staff'
import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type UpdateStaffRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  staffId: string
  data: UpdateStaffInput
}

export const updateStaffRepository = async ({
  tx = prisma,
  data,
  staffId,
}: UpdateStaffRepositoryInput) => {
  const cleaned = cleanDeep(data, {
    undefinedValues: true,
  }) as Prisma.StaffUpdateInput

  return tx.staff.update({
    where: { id: staffId },
    data: cleaned,
  })
}

export type UpdateStaffRepository = typeof updateStaffRepository
