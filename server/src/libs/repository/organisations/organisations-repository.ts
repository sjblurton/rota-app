import type {
  CreateOrganisationInput,
  Organisation,
  OrganisationsPaginationQuery,
} from "../../../types/organisation";
import { prisma } from "../../prisma/prisma";
import { getPrismaPaginationArgs } from "../../prisma/utils/getPrismaPaginationArgs";

export class OrganisationsRepository {
  private prisma = prisma;

  async createOrganisation(data: CreateOrganisationInput) {
    return this.prisma.organisation.create({ data });
  }

  async getOrganisationById(id: string) {
    return this.prisma.organisation.findUnique({ where: { id } });
  }

  async getAllOrganisations(args: OrganisationsPaginationQuery = {}) {
    return this.prisma.organisation.findMany(getPrismaPaginationArgs(args));
  }

  async updateOrganisation(id: string, data: Partial<Organisation>) {
    return this.prisma.organisation.update({ where: { id }, data });
  }

  async getOrganisationByName(name: string, paginationArgs: OrganisationsPaginationQuery = {}) {
    return this.prisma.organisation.findMany({
      where: { name },
      ...getPrismaPaginationArgs(paginationArgs),
    });
  }
}

export const organisationsRepository = new OrganisationsRepository();
