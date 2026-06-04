import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { useGetInviteById } from '../useGetInviteById/useGetInviteById'
import { useAcceptInvite } from '../useAcceptInvite/useAcceptInvite'
import { getInviteErrorMessage } from './utils/get-invite-error-message'
import { getInviteCanRetry } from './utils/get-invite-can-retry'

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
    isFetching: isInviteFetching,
    refetch: refetchInvite,
  } = useGetInviteById(inviteId)
  const navigate = useNavigate()
  const hasSessionToken = Boolean(session?.access_token)

  const acceptInvitedAndNavigate = useCallback(() => {
    if (!session?.access_token) return

    acceptInvite(
      { inviteId, token: session.access_token, body: { status: 'accepted' } },
      {
        onSuccess: () => {
          void navigate({ to: '/' })
        },
      },
    )
  }, [acceptInvite, inviteId, navigate, session?.access_token])

  useEffect(() => {
    if (!invite || !session) return
    if (acceptStatus !== 'idle') return

    if (invite.status === 'accepted') {
      void navigate({ to: '/' })
      return
    }

    if (invite.status === 'invited') {
      acceptInvitedAndNavigate()
      return
    }
  }, [invite, session, navigate, acceptStatus, acceptInvitedAndNavigate])

  const errorMessage = getInviteErrorMessage({
    inviteStatus: invite?.status,
    isInviteError,
    isAcceptError,
  })

  const canRetry = getInviteCanRetry({
    isSessionLoading,
    isInviteLoading,
    isInviteFetching,
    isInviteError,
    isAcceptError,
    hasSessionToken,
    inviteStatus: invite?.status,
  })

  const retry = useCallback(() => {
    if (isInviteError) {
      void refetchInvite()
      return
    }

    if (isAcceptError && session?.access_token && invite?.status === 'invited') {
      acceptInvitedAndNavigate()
    }
  }, [
    isInviteError,
    refetchInvite,
    isAcceptError,
    session?.access_token,
    invite?.status,
    acceptInvitedAndNavigate,
  ])

  return useMemo(
    () => ({
      errorMessage,
      isLoading:
        isInviteLoading || isInviteFetching || acceptStatus === 'pending' || isSessionLoading,
      canRetry,
      retry,
    }),
    [
      errorMessage,
      isInviteLoading,
      isInviteFetching,
      acceptStatus,
      isSessionLoading,
      canRetry,
      retry,
    ],
  )
}
