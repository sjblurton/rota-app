import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";

type GetOrganisationByIdRepositoryInput = {
  id: string;
  organisationRepo?: PrismaClient["organisation"];
};

export const getOrganisationByIdRepository = async ({
  id,
  organisationRepo = prisma.organisation,
}: GetOrganisationByIdRepositoryInput) => organisationRepo.findUnique({ where: { id } });

export type GetOrganisationByIdRepository = typeof getOrganisationByIdRepository;
