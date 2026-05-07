import type { CreateStaffInput } from '../../@types/staff'
import { staffSchema } from '../../libs/schemas/entities/staff'
import {
  type CheckOrganisationStaffEmailUniqueRepository,
  checkOrganisationStaffEmailUniqueRepository,
} from '../../repositories/staff/check-organisation-staff-email-unique.repository.ts'
import {
  type CheckOrganisationStaffPhoneUniqueRepository,
  checkOrganisationStaffPhoneUniqueRepository,
} from '../../repositories/staff/check-organisation-staff-phone-number-unique.repository'
import {
  type CreateStaffRepository,
  createStaffRepository,
} from '../../repositories/staff/create-staff.repository'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'

type CreateStaffServiceInput = {
  data: CreateStaffInput
  createStaff?: CreateStaffRepository
  checkOrganisationStaffPhoneUnique?: CheckOrganisationStaffPhoneUniqueRepository
  checkOrganisationStaffEmailUnique?: CheckOrganisationStaffEmailUniqueRepository
}

export const createStaffService = async ({
  data,
  createStaff = createStaffRepository,
  checkOrganisationStaffPhoneUnique = checkOrganisationStaffPhoneUniqueRepository,
  checkOrganisationStaffEmailUnique = checkOrganisationStaffEmailUniqueRepository,
}: CreateStaffServiceInput) => {
  const [isEmailAvailable, isPhoneNumberAvailable] = await Promise.all([
    checkOrganisationStaffEmailUnique({
      organisationId: data.organisation_id,
      ...(typeof data.email === 'string' ? { email: data.email } : {}),
    }),
    checkOrganisationStaffPhoneUnique({
      organisationId: data.organisation_id,
      ...(typeof data.phone_number === 'string' ? { phoneNumber: data.phone_number } : {}),
    }),
  ])

  if (!isEmailAvailable) {
    throw new HttpErrorByCode(
      'conflict',
      `A staff member with this email: ${data.email} already exists in the organisation`,
    )
  }

  if (!isPhoneNumberAvailable) {
    throw new HttpErrorByCode(
      'conflict',
      `A staff member with this phone number: ${data.phone_number} already exists in the organisation`,
    )
  }

  const raw = await createStaff({ data })

  return staffSchema.parseAsync(raw)
}

export type CreateStaffService = typeof createStaffService
