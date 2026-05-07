import { type Prisma, type PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type CheckOrganisationStaffEmailUniqueRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  organisationId: string
  email?: string
}

export const checkOrganisationStaffEmailUniqueRepository = async ({
  tx = prisma,
  organisationId,
  email,
}: CheckOrganisationStaffEmailUniqueRepositoryInput) => {
  if (!email) {
    return true
  }
  const existing = await tx.staff.findFirst({
    where: { organisation_id: organisationId, email },
  })
  return Boolean(existing)
}

export type CheckOrganisationStaffEmailUniqueRepository =
  typeof checkOrganisationStaffEmailUniqueRepository
