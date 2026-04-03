import { type CreateOrganisationInput } from "../../../types/organisation";
import { organisationsRepository } from "../repository/organisations-repository";

class OrganisationsService {
  private readonly repository = organisationsRepository;

  async createOrganisation(data: CreateOrganisationInput) {
    return this.repository.createOrganisation(data);
  }
}

export const organisationsService = new OrganisationsService();
