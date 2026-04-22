import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { getPrismaPaginationArgs } from "../../libs/prisma/utils/getPrismaPaginationArgs";
import type { OrganisationsPaginationQuery } from "../../types/organisation";

type GetOrganisationByNameRepositoryInput = {
  name: string;
  paginationArgs?: OrganisationsPaginationQuery;
  organisationRepo?: PrismaClient["organisation"];
};

export const getOrganisationByNameRepository = async ({
  name,
  paginationArgs = {},
  organisationRepo = prisma.organisation,
}: GetOrganisationByNameRepositoryInput) =>
  organisationRepo.findMany({
    where: { name },
    ...getPrismaPaginationArgs(paginationArgs),
  });
