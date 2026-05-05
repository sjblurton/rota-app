import { type Prisma, type PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'

type CheckOrganisationStaffPhoneUniqueRepositoryInput = {
  tx?: PrismaClient | Prisma.TransactionClient
  organisationId: string
  phoneNumber?: string
}

export const checkOrganisationStaffPhoneUniqueRepository = async ({
  tx = prisma,
  organisationId,
  phoneNumber,
}: CheckOrganisationStaffPhoneUniqueRepositoryInput) => {
  if (!phoneNumber) {
    return true
  }
  const existing = await tx.staff.findFirst({
    where: { organisation_id: organisationId, phone_number: phoneNumber },
  })
  return Boolean(existing)
}

export type CheckOrganisationStaffPhoneUniqueRepository =
  typeof checkOrganisationStaffPhoneUniqueRepository
