import { createFileRoute } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { useInviteById } from './hooks/useInviteById'

export const Route = createFileRoute('/invite/$inviteId/')({
  component: InvitePage,
})

function InvitePage() {
  const { inviteId } = Route.useParams()
  const { errorMessage, isLoading } = useInviteById(inviteId)

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invite Page
      </Typography>
      <Typography>Invite ID: {inviteId}</Typography>
      <Typography>{isLoading ? 'Loading...' : (errorMessage ?? 'You are signed in.')}</Typography>
    </Container>
  )
}
