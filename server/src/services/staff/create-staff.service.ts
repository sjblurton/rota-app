import type { CreateStaffInput } from '../../@types/staff'
import { staffSchema } from '../../libs/schemas/entities/staff'
import {
  type CreateStaffRepository,
  createStaffRepository,
} from '../../repositories/staff/create-staff.repository'

type CreateStaffServiceInput = {
  data: CreateStaffInput
  createStaff?: CreateStaffRepository
}

export const createStaffService = async ({
  data,
  createStaff = createStaffRepository,
}: CreateStaffServiceInput) => {
  // TODO: check there is not already a staff member with the same email (and/or phone number)
  // in the organisation? throw a conflict error if there is a conflict

  const raw = await createStaff({ data })

  return staffSchema.parseAsync(raw)
}

export type CreateStaffService = typeof createStaffService
