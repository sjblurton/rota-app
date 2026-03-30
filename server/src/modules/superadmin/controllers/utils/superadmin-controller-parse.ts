import { type Request, type Response } from "express";

import {
  createOrganisationSchema,
  updateOrganisationSchema,
} from "../../../../lib/schemas/entities/organisation";
import { createManagerSchema, updateManagerSchema } from "../../../../lib/schemas/entities/staff";
import {
  organisationIdParamSchema,
  organisationManagerIdsParamSchema,
} from "../../../../lib/schemas/parameters/ids/params";
import { parseOrSendBadRequest } from "../../../../utils/http/parse-or-send-bad-request";

export const parseCreateOrganisationBody = (request: Request, response: Response) =>
  parseOrSendBadRequest(
    createOrganisationSchema,
    request.body,
    response,
    "Invalid organisation payload",
  );

export const parseUpdateOrganisationBody = (request: Request, response: Response) =>
  parseOrSendBadRequest(
    updateOrganisationSchema,
    request.body,
    response,
    "Invalid organisation payload",
  );

export const parseCreateManagerBody = (request: Request, response: Response) =>
  parseOrSendBadRequest(createManagerSchema, request.body, response, "Invalid manager payload");

export const parseUpdateManagerBody = (request: Request, response: Response) =>
  parseOrSendBadRequest(updateManagerSchema, request.body, response, "Invalid manager payload");

export const parseOrganisationIdParams = (request: Request, response: Response) =>
  parseOrSendBadRequest(
    organisationIdParamSchema,
    request.params,
    response,
    "Invalid organisation ID",
  );

export const parseOrganisationManagerIdsParams = (request: Request, response: Response) =>
  parseOrSendBadRequest(
    organisationManagerIdsParamSchema,
    request.params,
    response,
    "Invalid organisation or manager ID",
  );
