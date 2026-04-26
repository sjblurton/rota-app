import { createFileRoute, useNavigate } from '@tanstack/react-router'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { supabase } from '#/libs/auth/supabase'
import { patchInvite } from '#/libs/api/invites-api'
import { useEffect, useState } from 'react'
import { isAxiosError } from 'axios'

export const Route = createFileRoute('/invite/$inviteId/')({
  component: InvitePage,
})

function InvitePage() {
  const navigate = useNavigate()
  const { inviteId } = Route.useParams()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log({ event, session })
      if (!session) {
        setIsSignedIn(false)
        return
      }

      if (event === 'SIGNED_OUT') {
        setIsSignedIn(false)
        return
      }

      setIsSignedIn(true)
      try {
        await patchInvite({
          inviteId,
          token: session.access_token,
          body: { status: 'accepted' },
        })

        navigate({ to: '/' })
      } catch (err: unknown) {
        if (!isAxiosError(err)) {
          setError('An unexpected error occurred.')
          return
        }
        if (err.response?.status === 409) {
          console.error('Conflict error:', err.response.data)
          setError(err.response.data?.detail || 'This invite cannot be accepted.')
        } else {
          setError('An unexpected error occurred.')
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [inviteId, navigate])

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Invite Page
      </Typography>
      <Typography>Invite ID: {inviteId}</Typography>
      <Typography>{isSignedIn ? 'You are signed in.' : 'You are not signed in.'}</Typography>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  )
}
