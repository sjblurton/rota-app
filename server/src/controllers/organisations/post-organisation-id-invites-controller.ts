import z from "zod";

import { createInviteBodySchema } from "../../libs/schemas/entities/invite";
import {
  type CreateInviteService,
  createInviteService,
} from "../../services/invites/create-invite-service";
import {
  getOrganisationByIdService,
  type GetOrganisationByIdServiceType,
} from "../../services/organisations/get-organisation-by-id-service";
import { type ExpressHandlerContext } from "../../types/http";
import { validateAndParse } from "../../utils/validation/validate-and-parse";

type PostOrganisationsIdInvitesInput = ExpressHandlerContext & {
  getOrganisationById?: GetOrganisationByIdServiceType;
  createInvite?: CreateInviteService;
};

export const postOrganisationIdInvitesController = async ({
  request,
  response,
  getOrganisationById = getOrganisationByIdService,
  createInvite = createInviteService,
}: PostOrganisationsIdInvitesInput) => {
  const { organisation_id: organisationId } = validateAndParse(
    z.object({ organisation_id: z.uuid() }),
    request.params,
  );

  const parsedBody = validateAndParse(createInviteBodySchema, request.body);

  await getOrganisationById({ id: organisationId });

  const invite = await createInvite({
    data: {
      organisation_id: organisationId,
      ...parsedBody,
    },
  });

  response.status(201).json(invite);
};
