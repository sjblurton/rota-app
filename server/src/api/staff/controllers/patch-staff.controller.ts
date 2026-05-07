import { type ExpressHandlerContext } from '../../../@types/http'
import { updateStaffSchema } from '../../../libs/schemas/entities/staff'
import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import {
  type UpdateStaffService,
  updateStaffService,
} from '../../../services/staff/update-staff.service'
import { validateAndParse } from '../../../utils/validation/validate-and-parse'

type PatchStaffControllerInput = {
  updateStaff?: UpdateStaffService
} & ExpressHandlerContext

export const patchStaffController = async ({
  request,
  response,
  updateStaff = updateStaffService,
}: PatchStaffControllerInput) => {
  const { staff_id: staffId } = validateAndParse(getStaffIdParamsSchema, request.params)
  const parsedBody = validateAndParse(updateStaffSchema, request.body)

  const updatedStaff = await updateStaff({ staffId, data: parsedBody })

  return response.status(200).json(updatedStaff)
}
