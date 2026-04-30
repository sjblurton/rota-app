import { type OrganisationsPaginationQuery } from '../../@types/organisation'
import { organisationSchema } from '../../libs/schemas/entities/organisation'
import {
  type GetAllOrganisationsRepository,
  getAllOrganisationsRepository,
} from '../../repositories/organisations/get-all-organisations-repository'

type GetAllOrganisationsServiceInput = {
  paginationQuery?: OrganisationsPaginationQuery
  getAllOrganisations?: GetAllOrganisationsRepository
}

export const getAllOrganisationsService = async ({
  paginationQuery = {},
  getAllOrganisations = getAllOrganisationsRepository,
}: GetAllOrganisationsServiceInput) => {
  const raw = await getAllOrganisations({ paginationQuery })

  return organisationSchema.array().parseAsync(raw)
}

export type GetAllOrganisationsServiceType = typeof getAllOrganisationsService
