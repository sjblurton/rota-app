import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { supabase } from '#/libs/auth/supabase'
import { patchInvite } from '#/libs/api/invites-api'
import { useState } from 'react'

export const Route = createFileRoute('/invite/$inviteId/')({
  component: InvitePage,
})

function InvitePage() {
  const navigate = useNavigate()
  const { inviteId } = Route.useParams()
  const [isSignedIn, setIsSignedIn] = useState(false)

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setIsSignedIn(true)
      await patchInvite(inviteId, session.access_token)
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
      <Typography>{isSignedIn ? 'You are signed in.' : 'You are not signed in.'}</Typography>
    </Container>
  )
}
