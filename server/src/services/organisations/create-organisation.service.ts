import { type CreateOrganisationInput } from "../../@types/organisation";
import { organisationSchema } from "../../libs/schemas/entities/organisation";
import {
  type CreateOrganisationRepository,
  createOrganisationRepository,
} from "../../repositories/organisations/create-organisation-repository";

type CreateOrganisationServiceInput = {
  data: CreateOrganisationInput;
  createOrganisation?: CreateOrganisationRepository;
};

export const createOrganisationService = async ({
  data,
  createOrganisation = createOrganisationRepository,
}: CreateOrganisationServiceInput) => {
  const raw = await createOrganisation({ data });
  return organisationSchema.parseAsync(raw);
};

export type CreateOrganisationServiceType = typeof createOrganisationService;
