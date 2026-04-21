import { type PrismaClient } from "../../generated/prisma/client";
import { prisma } from "../../libs/prisma/prisma";
import { organisationSchema } from "../../libs/schemas/entities/organisation";
import { getAllOrganisationsRepository } from "../../repositories/organisations/get-all-organisations-repository";
import { type OrganisationsPaginationQuery } from "../../types/organisation";

type GetAllOrganisationsServiceInput = {
  paginationQuery?: OrganisationsPaginationQuery;
  organisationRepo?: PrismaClient["organisation"];
};

export const getAllOrganisationsService = async ({
  paginationQuery = {},
  organisationRepo = prisma.organisation,
}: GetAllOrganisationsServiceInput) => {
  const raw = await getAllOrganisationsRepository({ paginationQuery, organisationRepo });

  return organisationSchema.array().parseAsync(raw);
};

export type GetAllOrganisationsServiceType = typeof getAllOrganisationsService;
