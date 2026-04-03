import { type Request, type Response } from "express";

import { createOrganisationSchema } from "../../../libs/schemas/entities/organisation";
import { validateAndParse } from "../../../utils/validation/validate-and-parse";
import { organisationsService } from "../services/organisations-service";

class OrganisationsController {
  private readonly service = organisationsService;

  createOrganisation = async (request: Request, response: Response) => {
    const parsedBody = validateAndParse(createOrganisationSchema, request.body);

    const organisation = await this.service.createOrganisation(parsedBody);

    response.status(201).json(organisation);
  };
}

export const organisationsController = new OrganisationsController();
