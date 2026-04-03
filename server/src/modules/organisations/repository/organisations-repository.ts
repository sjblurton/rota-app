import { prisma } from "../../../libs/prisma/prisma";
import type { CreateOrganisationInput, Organisation } from "../../../types/organisation";

export class OrganisationsRepository {
  private prisma = prisma;

  async createOrganisation(data: CreateOrganisationInput) {
    return this.prisma.organisation.create({ data });
  }

  async getOrganisationById(id: string) {
    return this.prisma.organisation.findUnique({ where: { id } });
  }

  async getAllOrganisations() {
    return this.prisma.organisation.findMany();
  }

  async updateOrganisation(id: string, data: Partial<Organisation>) {
    return this.prisma.organisation.update({ where: { id }, data });
  }

  async getOrganisationByName(name: string) {
    return this.prisma.organisation.findMany({ where: { name } });
  }
}
