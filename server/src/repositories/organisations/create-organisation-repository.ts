import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import type { CreateOrganisationInput } from "../../types/organisation";

type CreateOrganisationRepositoryInput = {
  data: CreateOrganisationInput;
  organisationRepo?: PrismaClient["organisation"];
};

export const createOrganisationRepository = async ({
  data,
  organisationRepo = prisma.organisation,
}: CreateOrganisationRepositoryInput) => organisationRepo.create({ data });

export type CreateOrganisationRepository = typeof createOrganisationRepository;
