import { type ExpressHandlerContext } from '../../../@types/http'
import { organisationsPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import {
  getAllOrganisationsService,
  type GetAllOrganisationsServiceType,
} from '../../../services/organisations/get-all-organisations.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type GetOrganisationsControllerInput = ExpressHandlerContext & {
  getAllOrganisations?: GetAllOrganisationsServiceType
}

export const getOrganisations = async ({
  request,
  response,
  getAllOrganisations = getAllOrganisationsService,
}: GetOrganisationsControllerInput) => {
  const parsedQuery = validateAndParse(organisationsPaginationQuerySchema, request.query)
  const organisations = await getAllOrganisations({ paginationQuery: parsedQuery })
  response.status(200).json(organisations)
}
