import { type ExpressHandlerContext } from '../../../@types/http'
import { createStaffBodySchema } from '../../../libs/schemas/entities/staff'
import { getOrganisationIdParamsSchema } from '../../../libs/schemas/params/getOrganisationIdParamsSchema'
import {
  getOrganisationByIdService,
  type GetOrganisationByIdServiceType,
} from '../../../services/organisations/get-organisation-by-id.service'
import {
  type CreateStaffService,
  createStaffService,
} from '../../../services/staff/create-staff.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type PostStaffControllerInput = {
  createStaff?: CreateStaffService
  getOrganisationById?: GetOrganisationByIdServiceType
} & ExpressHandlerContext

export const postStaffController = async ({
  request,
  response,
  getOrganisationById = getOrganisationByIdService,
  createStaff = createStaffService,
}: PostStaffControllerInput) => {
  const { organisation_id: organisationId } = validateAndParse(
    getOrganisationIdParamsSchema,
    request.params,
  )

  const parsedBody = validateAndParse(createStaffBodySchema, request.body)

  await getOrganisationById({ id: organisationId })

  const staff = await createStaff({
    data: { ...parsedBody, organisation_id: organisationId },
  })

  return response.status(201).json(staff)
}
