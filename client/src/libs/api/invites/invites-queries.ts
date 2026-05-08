import { queryOptions } from '@tanstack/react-query'
import { getInvite } from './invites-api'

export const inviteQueryOptions = (inviteId: string) =>
  queryOptions({
    queryKey: ['invites', inviteId],
    queryFn: () => getInvite({ inviteId }),
  })
