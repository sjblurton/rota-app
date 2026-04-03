import { prisma } from "../../../libs/prisma/prisma";
import type { CreateOrganisationInput } from "../../../types/organisation";

export class OrganisationsRepository {
  private prisma = prisma;

  async createOrganisation(data: CreateOrganisationInput) {
    const organisation = await this.prisma.organisation.create({ data });
    return organisation;
  }
}
