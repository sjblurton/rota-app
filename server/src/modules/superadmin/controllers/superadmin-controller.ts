import { Request, Response } from "express";
import { createOrganisationSchema } from "../../../lib/schemas/entities/organisation";
import { createManagerSchema } from "../../../lib/schemas/entities/staff";
import { organisationIdParamSchema } from "../../../lib/schemas/parameters/ids/params";
import { parseOrSendBadRequest } from "../../../utils/http/parse-or-send-bad-request";
import {
  createManagerForOrganisation,
  createOrganisation,
} from "../services/superadmin-service";

export const createOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedBody = parseOrSendBadRequest(
    createOrganisationSchema,
    request.body,
    response,
    "Invalid organisation payload",
  );

  if (!parsedBody) {
    return;
  }

  const organisation = createOrganisation(parsedBody);

  if (!organisation) {
    response.status(409).json({ message: "Organisation already exists" });
    return;
  }

  response.status(201).json(organisation);
};

export const createManagerForOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedParams = parseOrSendBadRequest(
    organisationIdParamSchema,
    request.params,
    response,
    "Invalid organisation ID",
  );

  if (!parsedParams) {
    return;
  }

  const parsedBody = parseOrSendBadRequest(
    createManagerSchema,
    request.body,
    response,
    "Invalid manager payload",
  );

  if (!parsedBody) {
    return;
  }

  const result = createManagerForOrganisation(
    parsedParams.organisation_id,
    parsedBody,
  );

  if (result.kind === "organisation_not_found") {
    response.status(404).json({ message: "Organisation not found" });
    return;
  }

  if (result.kind === "manager_email_conflict") {
    response
      .status(409)
      .json({ message: "Manager with this email already exists" });
    return;
  }

  response.status(201).json(result.manager);
};
