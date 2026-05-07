import { type ExpressHandlerContext } from '../../../@types/http'
import { organisationStaffPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import {
  type GetOrganisationStaffService,
  getOrganisationStaffService,
} from '../../../services/staff/get-organisation-staff.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type GetAllOrganisationStaffControllerInput = ExpressHandlerContext & {
  getOrganisationStaff?: GetOrganisationStaffService
}

export const getAllOrganisationStaffController = async ({
  request,
  response,
  getOrganisationStaff = getOrganisationStaffService,
}: GetAllOrganisationStaffControllerInput) => {
  const { organisation_id: organisationId } = validateAndParse(
    getOrganisationIdParamsSchema,
    request.params,
  )

  const paginationQuery = validateAndParse(organisationStaffPaginationQuerySchema, request.query)

  const staff = await getOrganisationStaff({ organisationId, paginationQuery })

  return response.json(staff)
}
