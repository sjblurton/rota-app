import z from 'zod'

import { type ExpressHandlerContext } from '../../../@types/http'
import { organisationStaffPaginationQuerySchema } from '../../../libs/schemas/pagination/pagination-options-query'
import {
  type GetOrganisationStaffService,
  getOrganisationStaffService,
} from '../../../services/staff/get-organisation-staff.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type GetAllOrganisationStaffControllerInput = ExpressHandlerContext & {
  getOrganisationStaff?: GetOrganisationStaffService
}

type GetAllOrganisationStaffController = (
  args: GetAllOrganisationStaffControllerInput,
) => Promise<void>

export const getAllOrganisationStaffController: GetAllOrganisationStaffController = async ({
  request,
  response,
  getOrganisationStaff = getOrganisationStaffService,
}) => {
  const { organisation_id: organisationId } = validateAndParse(
    z.object({ organisation_id: z.uuid() }),
    request.params,
  )

  const paginationQuery = validateAndParse(organisationStaffPaginationQuerySchema, request.query)

  const staff = await getOrganisationStaff({ organisationId, paginationQuery })

  response.json(staff)
}
