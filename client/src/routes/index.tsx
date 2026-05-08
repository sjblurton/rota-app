import { createFileRoute } from '@tanstack/react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useSession } from '#/hooks/useSession/useSession.ts'

export const Route = createFileRoute('/')({ component: App })

export function App() {
  const { session, isLoading } = useSession()

  return (
    <>
      <CssBaseline />
      <Container>
        <Stack spacing={2} sx={{ py: 6 }}>
          <Typography variant="h4">Rota App</Typography>

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
