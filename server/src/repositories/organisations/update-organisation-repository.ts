import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import type { Organisation } from "../../types/organisation";

type UpdateOrganisationRepositoryInput = {
  id: string;
  data: Partial<Organisation>;
  organisationRepo?: PrismaClient["organisation"];
};

export const updateOrganisationRepository = async ({
  id,
  data,
  organisationRepo = prisma.organisation,
}: UpdateOrganisationRepositoryInput) => organisationRepo.update({ where: { id }, data });
