import { organisationSchema } from "../../libs/schemas/entities/organisation";
import {
  type CreateOrganisationRepository,
  createOrganisationRepository,
} from "../../repositories/organisations/create-organisation-repository";
import { type CreateOrganisationInput } from "../../types/organisation";

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
