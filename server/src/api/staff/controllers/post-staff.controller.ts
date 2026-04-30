import z from 'zod'

import { type ExpressHandlerContext } from '../../../@types/http'
import { createStaffBodySchema } from '../../../libs/schemas/entities/staff'
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
    z.object({ organisation_id: z.uuid() }),
    request.params,
  )

  const parsedBody = validateAndParse(createStaffBodySchema, request.body)

  await getOrganisationById({ id: organisationId })

  const staff = await createStaff({
    data: { ...parsedBody, organisation_id: organisationId },
  })

  response.status(201).json({ message: 'Staff member created successfully', staff })
}
