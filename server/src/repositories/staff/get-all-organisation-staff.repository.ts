import type { OrganisationStaffPaginationQuery } from '../../@types/organisation'
import type { Prisma, PrismaClient } from '../../generated/prisma/client'
import { prisma } from '../../libs/prisma/prisma'
import { getPrismaPaginationArgs } from '../../libs/prisma/utils/getPrismaPaginationArgs'

type GetOrganisationStaffRepositoryInput = {
  paginationQuery?: OrganisationStaffPaginationQuery
  tx?: PrismaClient | Prisma.TransactionClient
  organisationId: string
}

export const getOrganisationStaffRepository = async ({
  tx = prisma,
  paginationQuery = {},
  organisationId,
}: GetOrganisationStaffRepositoryInput) => {
  return tx.staff.findMany({
    ...getPrismaPaginationArgs(paginationQuery),
    where: {
      organisation_id: organisationId,
    },
  })
}

export type GetOrganisationStaffRepository = typeof getOrganisationStaffRepository
