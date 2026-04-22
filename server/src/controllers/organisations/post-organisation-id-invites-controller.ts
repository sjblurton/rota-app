import z from "zod";

import { createInviteBodySchema } from "../../libs/schemas/entities/invite";
import {
  getOrganisationByIdService,
  type GetOrganisationByIdServiceType,
} from "../../services/organisations/get-organisation-by-id-service";
import { type ExpressHandlerContext } from "../../types/http";
import { validateAndParse } from "../../utils/validation/validate-and-parse";

type PostOrganisationsIdInvitesInput = ExpressHandlerContext & {
  getOrganisationById?: GetOrganisationByIdServiceType;
};

export const postOrganisationIdInvitesController = async ({
  request,
  response,
  getOrganisationById = getOrganisationByIdService,
}: PostOrganisationsIdInvitesInput) => {
  const { organisation_id: organisationId } = validateAndParse(
    z.object({ organisation_id: z.uuid() }),
    request.params,
  );

  const parsedBody = validateAndParse(createInviteBodySchema, request.body);

  await getOrganisationById({ id: organisationId });

  response.status(201).json({
    id: "inv-123e4567-e89b-12d3-a456-426614174000",
    email: parsedBody.email,
    organisation_id: organisationId,
    invited_by_user_id: "user-123e4567-e89b-12d3-a456-426614174000",
    status: "invited",
    created_at: "2026-04-20T10:00:00Z",
    updated_at: "2026-04-20T10:00:00Z",
    expires_at: "2026-05-20T10:00:00Z",
    preferred_contact_method: "email",
  });
};
