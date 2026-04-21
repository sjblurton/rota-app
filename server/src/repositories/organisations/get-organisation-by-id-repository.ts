import type { PrismaClient } from "../../generated/prisma/client";

type GetOrganisationByIdRepositoryInput = {
  id: string;
  organisationRepo: PrismaClient["organisation"];
};

export const getOrganisationByIdRepository = async ({
  id,
  organisationRepo,
}: GetOrganisationByIdRepositoryInput) => organisationRepo.findUnique({ where: { id } });
