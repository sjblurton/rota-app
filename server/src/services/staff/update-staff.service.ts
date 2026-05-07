import type { UpdateStaffInput } from '../../@types/staff'
import {
  type UpdateStaffRepository,
  updateStaffRepository,
} from '../../repositories/staff/update-staff.repository'

type UpdateStaffServiceInput = {
  updateStaff?: UpdateStaffRepository
  staffId: string
  data: UpdateStaffInput
}

export const updateStaffService = async ({
  staffId,
  data,
  updateStaff = updateStaffRepository,
}: UpdateStaffServiceInput) => {
  return updateStaff({ staffId, data })
}

export type UpdateStaffService = typeof updateStaffService
