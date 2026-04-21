import type { PrismaClient } from "../../generated/prisma/client";
import type { CreateOrganisationInput } from "../../types/organisation";

type CreateOrganisationRepositoryInput = {
  data: CreateOrganisationInput;
  organisationRepo: PrismaClient["organisation"];
};

export const createOrganisationRepository = async ({
  data,
  organisationRepo,
}: CreateOrganisationRepositoryInput) => organisationRepo.create({ data });
