import type { PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { organisationSchema } from "../../libs/schemas/entities/organisation";
import { getOrganisationByIdRepository } from "../../repositories/organisations/get-organisation-by-id-repository";
import { HttpErrorByCode } from "../../utils/http/HttpErrorByCode";

type GetOrganisationByIdServiceInput = {
  id: string;
  organisationRepo?: PrismaClient["organisation"];
};

export const getOrganisationByIdService = async (args: GetOrganisationByIdServiceInput) => {
  const { id, organisationRepo = prisma.organisation } = args;
  const organisation = await getOrganisationByIdRepository({ id, organisationRepo });
  if (!organisation) {
    throw new HttpErrorByCode("not_found", "Organisation not found");
  }
  return organisationSchema.parseAsync(organisation);
};

export type GetOrganisationByIdServiceType = typeof getOrganisationByIdService;
