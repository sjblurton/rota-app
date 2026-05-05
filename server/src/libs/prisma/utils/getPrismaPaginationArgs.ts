import type {
  OrganisationsPaginationQuery,
  OrganisationStaffPaginationQuery,
} from '../../../@types/organisation'

const DEFAULT_ORDER_BY_KEY = 'created_at' as const

type GetPrismaPaginationArgsInput = OrganisationsPaginationQuery | OrganisationStaffPaginationQuery

export function getPrismaPaginationArgs({
  limit = 20,
  offset = 0,
  order_by_key: orderByKey = DEFAULT_ORDER_BY_KEY,
  direction = 'desc',
}: GetPrismaPaginationArgsInput) {
  return {
    skip: offset,
    take: limit,
    orderBy: {
      [orderByKey]: direction,
    },
  }
}
