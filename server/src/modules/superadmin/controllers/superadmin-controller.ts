import { Request, Response } from "express";
import { createOrganisationSchema } from "../../../lib/schemas/entities/organisation";
import { createManagerSchema } from "../../../lib/schemas/entities/staff";
import { organisationIdParamSchema } from "../../../lib/schemas/parameters/ids/params";
import {
  createManagerForOrganisation,
  createOrganisation,
} from "../services/superadmin-service";

export const createOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedBody = createOrganisationSchema.safeParse(request.body);

  if (!parsedBody.success) {
    response.status(400).json({ message: "Invalid organisation payload" });
    return;
  }

  const organisation = createOrganisation(parsedBody.data);

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
  const parsedParams = organisationIdParamSchema.safeParse(request.params);

  if (!parsedParams.success) {
    response.status(400).json({ message: "Invalid organisation ID" });
    return;
  }

  const parsedBody = createManagerSchema.safeParse(request.body);

  if (!parsedBody.success) {
    response.status(400).json({ message: "Invalid manager payload" });
    return;
  }

  const result = createManagerForOrganisation(
    parsedParams.data.organisation_id,
    parsedBody.data,
  );

  if (result.kind === "organisation_not_found") {
    response.status(404).json({ message: "Organisation not found" });
    return;
  }

  if (result.kind === "manager_email_conflict") {
    response.status(409).json({ message: "Manager with this email already exists" });
    return;
  }

  response.status(201).json(result.manager);
};
