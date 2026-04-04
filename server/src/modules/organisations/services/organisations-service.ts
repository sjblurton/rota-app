import type {
  CreateOrganisationInput,
  OrganisationsPaginationQuery,
} from "../../../types/organisation";
import { organisationsRepository } from "../repository/organisations-repository";

class OrganisationsService {
  private readonly repository = organisationsRepository;

  async createOrganisation(data: CreateOrganisationInput) {
    return this.repository.createOrganisation(data);
  }

  async getAllOrganisations(args: OrganisationsPaginationQuery = {}) {
    return this.repository.getAllOrganisations(args);
  }
}

export const organisationsService = new OrganisationsService();
