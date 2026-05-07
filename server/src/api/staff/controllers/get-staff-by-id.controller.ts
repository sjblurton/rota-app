import { type ExpressHandlerContext } from '../../../@types/http'
import { getStaffIdParamsSchema } from '../../../libs/schemas/params/getStaffParamsSchema'
import {
  type GetStaffByIdService,
  getStaffByIdService,
} from '../../../services/staff/get-staff-by-id.service'

type GetStaffByIdControllerInput = {
  getStaffById?: GetStaffByIdService
} & ExpressHandlerContext

export const getStaffByIdController = async ({
  request,
  response,
  getStaffById = getStaffByIdService,
}: GetStaffByIdControllerInput) => {
  const { staff_id: staffId } = getStaffIdParamsSchema.parse(request.params)

  const staff = await getStaffById({ staffId })

  return response.status(200).json(staff)
}
