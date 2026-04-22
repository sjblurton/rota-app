import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { getPrismaPaginationArgs } from "../../libs/prisma/utils/getPrismaPaginationArgs";
import type { OrganisationsPaginationQuery } from "../../types/organisation";

type GetAllOrganisationsRepositoryInput = {
  paginationQuery?: OrganisationsPaginationQuery;
  organisationRepo?: PrismaClient["organisation"];
};

export const getAllOrganisationsRepository = async ({
  paginationQuery = {},
  organisationRepo = prisma.organisation,
}: GetAllOrganisationsRepositoryInput) =>
  organisationRepo.findMany(getPrismaPaginationArgs(paginationQuery));

export type GetAllOrganisationsRepository = typeof getAllOrganisationsRepository;
