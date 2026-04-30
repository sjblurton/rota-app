import { type ExpressHandlerContext } from "../../../@types/http";
import { createOrganisationSchema } from "../../../libs/schemas/entities/organisation";
import {
  createOrganisationService,
  type CreateOrganisationServiceType,
} from "../../../services/organisations/create-organisation.service";
import { validateAndParse } from "../../../utils/validation/validate-and-parse";

type PostOrganisationsInput = ExpressHandlerContext & {
  createOrganisation?: CreateOrganisationServiceType;
};

export const postOrganisations = async ({
  request,
  response,
  createOrganisation = createOrganisationService,
}: PostOrganisationsInput) => {
  const parsedBody = validateAndParse(createOrganisationSchema, request.body);
  const organisation = await createOrganisation({
    data: parsedBody,
  });
  response.status(201).json(organisation);
};
