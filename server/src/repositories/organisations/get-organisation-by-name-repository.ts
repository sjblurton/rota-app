import type { PrismaClient } from "../../generated/prisma/client";
import { getPrismaPaginationArgs } from "../../libs/prisma/utils/getPrismaPaginationArgs";
import type { OrganisationsPaginationQuery } from "../../types/organisation";

type GetOrganisationByNameRepositoryInput = {
  name: string;
  paginationArgs?: OrganisationsPaginationQuery;
  organisationRepo: PrismaClient["organisation"];
};

export const getOrganisationByNameRepository = async ({
  name,
  paginationArgs = {},
  organisationRepo,
}: GetOrganisationByNameRepositoryInput) =>
  organisationRepo.findMany({
    where: { name },
    ...getPrismaPaginationArgs(paginationArgs),
  });
