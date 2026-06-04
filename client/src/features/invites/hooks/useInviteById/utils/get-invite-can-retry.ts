import { type InviteStatus } from '#/libs/api/invites/@types/invites.ts'

export const getInviteCanRetry = ({
  isSessionLoading,
  isInviteLoading,
  isInviteFetching,
  isInviteError,
  isAcceptError,
  hasSessionToken,
  inviteStatus,
}: {
  isSessionLoading: boolean
  isInviteLoading: boolean
  isInviteFetching: boolean
  isInviteError: boolean
  isAcceptError: boolean
  hasSessionToken: boolean
  inviteStatus: InviteStatus | undefined
}): boolean => {
  const canRetryAccept = isAcceptError && hasSessionToken && inviteStatus === 'invited'
  return (
    !isSessionLoading && !isInviteLoading && !isInviteFetching && (isInviteError || canRetryAccept)
  )
}
