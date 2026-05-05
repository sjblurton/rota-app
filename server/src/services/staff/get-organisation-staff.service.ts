import { type OrganisationStaffPaginationQuery } from '../../@types/organisation'
import {
  type GetOrganisationStaffRepository,
  getOrganisationStaffRepository,
} from '../../repositories/staff/get-all-organisation-staff.repository'

type GetOrganisationStaffServiceInput = {
  getOrganisationStaff?: GetOrganisationStaffRepository
  paginationQuery?: OrganisationStaffPaginationQuery
  organisationId: string
}

export const getOrganisationStaffService = async ({
  organisationId,
  getOrganisationStaff = getOrganisationStaffRepository,
  paginationQuery = {},
}: GetOrganisationStaffServiceInput) => {
  return getOrganisationStaff({ organisationId, paginationQuery })
}

export type GetOrganisationStaffService = typeof getOrganisationStaffService
