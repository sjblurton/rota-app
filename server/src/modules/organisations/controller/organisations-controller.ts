import { type Request, type Response } from "express";

import { createOrganisationSchema } from "../../../libs/schemas/entities/organisation";
import { organisationsPaginationQuerySchema } from "../../../libs/schemas/pagination/pagination-options-query";
import { validateAndParse } from "../../../utils/validation/validate-and-parse";
import { organisationsService } from "../services/organisations-service";

class OrganisationsController {
  private readonly service = organisationsService;

  createOrganisation = async (request: Request, response: Response) => {
    const parsedBody = validateAndParse(createOrganisationSchema, request.body);

    const organisation = await this.service.createOrganisation(parsedBody);

    response.status(201).json(organisation);
  };

  getOrganisations = async (request: Request, response: Response) => {
    const parsedQuery = validateAndParse(organisationsPaginationQuerySchema, request.query);

    const organisations = await this.service.getAllOrganisations(parsedQuery);

    response.status(200).json(organisations);
  };
}

export const organisationsController = new OrganisationsController();
