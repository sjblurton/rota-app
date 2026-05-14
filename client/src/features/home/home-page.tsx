import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useSession } from '#/hooks/useSession/useSession.ts'

export function HomePage() {
  const { session, isLoading } = useSession()

  return (
    <>
      <Container>
        <Stack spacing={2} sx={{ py: 6 }}>
          <Typography variant="h1">Rota App</Typography>

          {isLoading ? (
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <CircularProgress size={20} />
              <Typography>Loading session...</Typography>
            </Stack>
          ) : session?.user ? (
            <Typography>Welcome, {session.user.email}</Typography>
          ) : (
            <Typography>Please sign in to continue.</Typography>
          )}
        </Stack>
      </Container>
    </>
  )
}
