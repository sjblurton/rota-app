import { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAcceptInvite } from '#/hooks/invites/useAcceptInvite/useAcceptInvite'
import { useGetInviteById } from '#/hooks/invites/useGetInviteById/useGetInviteById'
import { useSession } from '#/hooks/useSession/useSession'

/**
 * Manages the invite acceptance flow for a given invite ID.
 *
 * Behaviour:
 * - `accepted` — navigates to the dashboard immediately.
 * - `invited` — accepts the invite using the current session token, then navigates to the dashboard on success.
 * - `expired` or `revoked` — returns a localised error message for the component to display.
 * - API errors (network failures, unexpected status codes) are handled globally via the TanStack Query MutationCache and displayed in the ApiErrorSnackbar.
 *
 * @param inviteId - The invite identifier from the route params.
 * @returns An object containing:
 * - `errorMessage` — a user-facing error string when the invite is expired, revoked, or a request fails; otherwise `null`.
 * - `isLoading` — `true` while the invite is being fetched or the accept mutation is in flight.
 */
export const useInviteById = (inviteId: string) => {
  const { session, isLoading: isSessionLoading } = useSession()
  const { mutate: acceptInvite, isError: isAcceptError, status: acceptStatus } = useAcceptInvite()
  const {
    data: invite,
    isError: isInviteError,
    isLoading: isInviteLoading,
  } = useGetInviteById(inviteId)
  const navigate = useNavigate()

  useEffect(() => {
    if (!invite || !session) return
    if (acceptStatus !== 'idle') return

    if (invite.status === 'accepted') {
      void navigate({ to: '/' })
      return
    }

    if (invite.status === 'invited') {
      acceptInvite(
        { inviteId, token: session.access_token, body: { status: 'accepted' } },
        {
          onSuccess: () => {
            void navigate({ to: '/' })
          },
        },
      )
      return
    }
  }, [invite, session, inviteId, navigate, acceptInvite, acceptStatus])

  const errorMessage =
    invite?.status === 'expired'
      ? 'This invite has expired.'
      : invite?.status === 'revoked'
        ? 'This invite has been revoked.'
        : isInviteError || isAcceptError
          ? 'Something went wrong. Please try again.'
          : null

  return {
    errorMessage,
    isLoading: isInviteLoading || acceptStatus === 'pending' || isSessionLoading,
  }
}
