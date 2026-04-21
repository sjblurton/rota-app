import type { PrismaClient } from "../../generated/prisma/client";
import { getPrismaPaginationArgs } from "../../libs/prisma/utils/getPrismaPaginationArgs";
import type { OrganisationsPaginationQuery } from "../../types/organisation";

type GetAllOrganisationsRepositoryInput = {
  paginationQuery?: OrganisationsPaginationQuery;
  organisationRepo: PrismaClient["organisation"];
};

export const getAllOrganisationsRepository = async ({
  paginationQuery = {},
  organisationRepo,
}: GetAllOrganisationsRepositoryInput) =>
  organisationRepo.findMany(getPrismaPaginationArgs(paginationQuery));
