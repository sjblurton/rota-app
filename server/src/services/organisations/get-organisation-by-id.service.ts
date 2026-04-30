import { organisationSchema } from '../../libs/schemas/entities/organisation'
import {
  type GetOrganisationByIdRepository,
  getOrganisationByIdRepository,
} from '../../repositories/organisations/get-organisation-by-id-repository'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'

type GetOrganisationByIdServiceInput = {
  id: string
  getOrganisationById?: GetOrganisationByIdRepository
}

export const getOrganisationByIdService = async (args: GetOrganisationByIdServiceInput) => {
  const { id, getOrganisationById = getOrganisationByIdRepository } = args
  const organisation = await getOrganisationById({ id })
  if (!organisation) {
    throw new HttpErrorByCode('not_found', 'Organisation not found')
  }
  return organisationSchema.parseAsync(organisation)
}

export type GetOrganisationByIdServiceType = typeof getOrganisationByIdService
