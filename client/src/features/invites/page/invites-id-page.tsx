import { useInviteById } from '../hooks/useInviteById/useInviteById'
import { InviteIdPagePresentation } from './invites-id-page.presentation'

type InviteIdPageProps = {
  invitesId: string
}

export const InviteIdPage = ({ invitesId }: InviteIdPageProps) => {
  const { errorMessage, isLoading, canRetry, retry } = useInviteById(invitesId)

  return (
    <InviteIdPagePresentation
      errorMessage={errorMessage}
      isLoading={isLoading}
      canRetry={canRetry}
      retry={retry}
    />
  )
}
