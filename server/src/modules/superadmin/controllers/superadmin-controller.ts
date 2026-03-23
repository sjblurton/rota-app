import { Request, Response } from "express";
import {
  createManagerForOrganisation,
  createOrganisation,
  updateManagerForOrganisation,
  updateOrganisation,
} from "../services/superadmin-service";
import {
  parseCreateManagerBody,
  parseCreateOrganisationBody,
  parseOrganisationIdParams,
  parseOrganisationManagerIdsParams,
  parseUpdateManagerBody,
  parseUpdateOrganisationBody,
} from "./superadmin-controller-parse";
import {
  sendCreateManagerForOrganisationResponse,
  sendCreateOrganisationResponse,
  sendUpdateManagerForOrganisationResponse,
  sendUpdateOrganisationResponse,
} from "./superadmin-controller-response";

export const createOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedBody = parseCreateOrganisationBody(request, response);

  if (!parsedBody) {
    return;
  }

  const organisation = createOrganisation(parsedBody);
  sendCreateOrganisationResponse(response, organisation);
};

export const createManagerForOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedParams = parseOrganisationIdParams(request, response);

  if (!parsedParams) {
    return;
  }

  const parsedBody = parseCreateManagerBody(request, response);

  if (!parsedBody) {
    return;
  }

  const result = createManagerForOrganisation(
    parsedParams.organisation_id,
    parsedBody,
  );

  sendCreateManagerForOrganisationResponse(response, result);
};

export const updateOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedParams = parseOrganisationIdParams(request, response);

  if (!parsedParams) {
    return;
  }

  const parsedBody = parseUpdateOrganisationBody(request, response);

  if (!parsedBody) {
    return;
  }

  const result = updateOrganisation(parsedParams.organisation_id, parsedBody);

  sendUpdateOrganisationResponse(response, result);
};

export const updateManagerForOrganisationController = (
  request: Request,
  response: Response,
) => {
  const parsedParams = parseOrganisationManagerIdsParams(request, response);

  if (!parsedParams) {
    return;
  }

  const parsedBody = parseUpdateManagerBody(request, response);

  if (!parsedBody) {
    return;
  }

  const result = updateManagerForOrganisation(
    parsedParams.organisation_id,
    parsedParams.manager_id,
    parsedBody,
  );

  sendUpdateManagerForOrganisationResponse(response, result);
};
