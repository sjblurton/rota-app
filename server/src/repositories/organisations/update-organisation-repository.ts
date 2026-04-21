import type { PrismaClient } from "../../generated/prisma/client";
import type { Organisation } from "../../types/organisation";

type UpdateOrganisationRepositoryInput = {
  id: string;
  data: Partial<Organisation>;
  organisationRepo: PrismaClient["organisation"];
};

export const updateOrganisationRepository = async ({
  id,
  data,
  organisationRepo,
}: UpdateOrganisationRepositoryInput) => organisationRepo.update({ where: { id }, data });
