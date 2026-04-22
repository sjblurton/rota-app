import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { supabase } from '#/libs/auth/supabase'

export const Route = createFileRoute('/invite/$inviteId/')({
  component: InvitePage,
})

function InvitePage() {
  const navigate = useNavigate()
  const { inviteId } = Route.useParams()

  const {
    data: {
      subscription: { id },
    },
  } = supabase.auth.onAuthStateChange(async (event, session) => {
    console.log('Auth event:', event, 'Session:', session)
    if (event === 'SIGNED_IN' && session) {
      await fetch(`/api/invites/${inviteId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      navigate({
        to: '/',
      })
    }
  })

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invite Page
      </Typography>
      <Typography>Invite ID: {inviteId}</Typography>
      <Typography>Subscription ID: {id.toString()}</Typography>
    </Container>
  )
}
