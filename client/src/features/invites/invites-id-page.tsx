import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useInviteById } from './hooks/useInviteById'

type InviteIdPageProps = {
  invitesId: string
}

export const InviteIdPage = ({ invitesId }: InviteIdPageProps) => {
  const { errorMessage, isLoading } = useInviteById(invitesId)
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invite Page
      </Typography>
      <Typography>Invite ID: {invitesId}</Typography>
      <Typography>{isLoading ? 'Loading...' : (errorMessage ?? 'You are signed in.')}</Typography>
    </Container>
  )
}
