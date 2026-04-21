import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { organisationSchema } from "../../libs/schemas/entities/organisation";
import { createOrganisationRepository } from "../../repositories/organisations/create-organisation-repository";
import { type CreateOrganisationInput } from "../../types/organisation";

type CreateOrganisationServiceInput = {
  data: CreateOrganisationInput;
  organisationRepo?: PrismaClient["organisation"];
};

export const createOrganisationService = async ({
  data,
  organisationRepo = prisma.organisation,
}: CreateOrganisationServiceInput) => {
  const raw = await createOrganisationRepository({ data, organisationRepo });
  return organisationSchema.parseAsync(raw);
};

export type CreateOrganisationServiceType = typeof createOrganisationService;
