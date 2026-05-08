import { useMutation } from '@tanstack/react-query'
import { patchInvite } from '#/libs/api/invites/invites-api'

/**
 * Accepts an invite by patching its status to `accepted` via the API.
 *
 * Thin wrapper around `useMutation` with {@link patchInvite} as the mutation function.
 *
 * @returns A TanStack Query mutation result. Call `mutate` to trigger the request:
 *
 * @example
 * const { mutate: acceptInvite, status } = useAcceptInvite()
 *
 * acceptInvite(
 *   { inviteId, token: session.access_token, body: { status: 'accepted' } },
 *   { onSuccess: () => navigate({ to: '/' }) },
 * )
 */
export const useAcceptInvite = () =>
  useMutation({
    mutationFn: patchInvite,
  })
