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
}: CreateOrganisationRepositoryInput) => {
  const { id, ...rest } = data;
  const input = id ? { id, ...rest } : rest;
  return organisationRepo.create({ data: input });
};

export type CreateOrganisationRepository = typeof createOrganisationRepository;
