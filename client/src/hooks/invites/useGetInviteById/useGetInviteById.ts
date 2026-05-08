import { useQuery } from '@tanstack/react-query'
import { inviteQueryOptions } from '#/libs/api/invites/invites-queries'

/**
 * Fetches a single invite by its ID using TanStack Query.
 *
 * Thin wrapper around `useQuery` with {@link inviteQueryOptions}.
 * Caches under the `['invites', inviteId]` query key.
 *
 * @param inviteId - The ID of the invite to fetch.
 * @returns A TanStack Query result containing the fetched {@link Invite}, loading state, and error state.
 *
 * @example
 * const { data: invite, isLoading, isError } = useGetInviteById(inviteId)
 */
export const useGetInviteById = (inviteId: string) => useQuery(inviteQueryOptions(inviteId))
