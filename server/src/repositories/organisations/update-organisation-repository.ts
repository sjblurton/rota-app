import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import type { UpdateOrganisationInput } from "../../types/organisation";

type UpdateOrganisationRepositoryInput = {
  id: string;
  data: UpdateOrganisationInput;
  organisationRepo?: PrismaClient["organisation"];
};

export const updateOrganisationRepository = async ({
  id,
  data,
  organisationRepo = prisma.organisation,
}: UpdateOrganisationRepositoryInput) => organisationRepo.update({ where: { id }, data });
