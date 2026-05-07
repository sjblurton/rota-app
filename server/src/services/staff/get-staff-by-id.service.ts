import {
  type GetStaffByIdRepository,
  getStaffByIdRepository,
} from '../../repositories/staff/get-staff-by-id.repository'

type GetStaffByIdServiceInput = {
  getStaffById?: GetStaffByIdRepository
  staffId: string
}

export const getStaffByIdService = async ({
  staffId,
  getStaffById = getStaffByIdRepository,
}: GetStaffByIdServiceInput) => {
  return getStaffById({ staffId })
}

export type GetStaffByIdService = typeof getStaffByIdService
