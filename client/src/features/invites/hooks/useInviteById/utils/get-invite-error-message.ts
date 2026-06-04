import { type InviteStatus } from '#/libs/api/invites/@types/invites.ts'

export const getInviteErrorMessage = ({
  inviteStatus,
  isInviteError,
  isAcceptError,
}: {
  inviteStatus: InviteStatus | undefined
  isInviteError: boolean
  isAcceptError: boolean
}): string | null => {
  if (inviteStatus === 'expired') return 'This invite has expired.'
  if (inviteStatus === 'revoked') return 'This invite has been revoked.'
  if (isInviteError || isAcceptError) return 'Something went wrong. Please try again.'
  return null
}
