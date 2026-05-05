import { v4 as uuidV4 } from 'uuid'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { type CreateStaffInput } from '../../@types/staff'
import { HttpErrorByCode } from '../../utils/http/HttpErrorByCode'
import { createStaffService } from './create-staff.service'

const orgId = uuidV4()
const staffId = uuidV4()

const validData: CreateStaffInput = {
  name: 'Jane Doe',
  role: 'manager',
  status: 'active',
  organisation_id: orgId,
  email: 'jane@example.com',
  phone_number: '+447123456789',
}

describe('createStaffService', () => {
  let createStaff: any
  let checkOrganisationStaffEmailUnique: any
  let checkOrganisationStaffPhoneUnique: any

  beforeEach(() => {
    createStaff = vi.fn().mockResolvedValue({ ...validData, id: staffId })
    checkOrganisationStaffEmailUnique = vi.fn().mockResolvedValue(true)
    checkOrganisationStaffPhoneUnique = vi.fn().mockResolvedValue(true)
  })

  it('creates staff when email and phone are unique', async () => {
    const staff = await createStaffService({
      data: validData,
      createStaff,
      checkOrganisationStaffEmailUnique,
      checkOrganisationStaffPhoneUnique,
    })
    expect(checkOrganisationStaffEmailUnique).toHaveBeenCalledWith({
      organisationId: validData.organisation_id,
      email: validData.email,
    })
    expect(checkOrganisationStaffPhoneUnique).toHaveBeenCalledWith({
      organisationId: validData.organisation_id,
      phoneNumber: validData.phone_number,
    })
    expect(createStaff).toHaveBeenCalledWith({ data: validData })
    expect(staff).toMatchObject({ ...validData, id: staffId })
  })

  it('throws if email is not unique', async () => {
    checkOrganisationStaffEmailUnique.mockResolvedValue(false)
    await expect(
      createStaffService({
        data: validData,
        createStaff,
        checkOrganisationStaffEmailUnique,
        checkOrganisationStaffPhoneUnique,
      }),
    ).rejects.toThrow(HttpErrorByCode)
  })

  it('throws if phone is not unique', async () => {
    checkOrganisationStaffPhoneUnique.mockResolvedValue(false)
    await expect(
      createStaffService({
        data: validData,
        createStaff,
        checkOrganisationStaffEmailUnique,
        checkOrganisationStaffPhoneUnique,
      }),
    ).rejects.toThrow(HttpErrorByCode)
  })

  it('throws if createStaff fails', async () => {
    createStaff.mockRejectedValue(new Error('fail'))
    await expect(
      createStaffService({
        data: validData,
        createStaff,
        checkOrganisationStaffEmailUnique,
        checkOrganisationStaffPhoneUnique,
      }),
    ).rejects.toThrow('fail')
  })

  it('handles missing email (undefined)', async () => {
    const data = { ...validData, email: undefined }
    await createStaffService({
      data,
      createStaff,
      checkOrganisationStaffEmailUnique,
      checkOrganisationStaffPhoneUnique,
    })
    expect(checkOrganisationStaffEmailUnique).toHaveBeenCalledWith({
      organisationId: data.organisation_id,
    })
  })

  it('handles missing phone_number (undefined)', async () => {
    const data = { ...validData, phone_number: undefined }
    await createStaffService({
      data,
      createStaff,
      checkOrganisationStaffEmailUnique,
      checkOrganisationStaffPhoneUnique,
    })
    expect(checkOrganisationStaffPhoneUnique).toHaveBeenCalledWith({
      organisationId: data.organisation_id,
    })
  })

  it('handles null email', async () => {
    const data = { ...validData, email: null }
    await createStaffService({
      data,
      createStaff,
      checkOrganisationStaffEmailUnique,
      checkOrganisationStaffPhoneUnique,
    })
    expect(checkOrganisationStaffEmailUnique).toHaveBeenCalledWith({
      organisationId: data.organisation_id,
    })
  })

  it('handles null phone_number', async () => {
    const data = { ...validData, phone_number: null }
    await createStaffService({
      data,
      createStaff,
      checkOrganisationStaffEmailUnique,
      checkOrganisationStaffPhoneUnique,
    })
    expect(checkOrganisationStaffPhoneUnique).toHaveBeenCalledWith({
      organisationId: data.organisation_id,
    })
  })
})
