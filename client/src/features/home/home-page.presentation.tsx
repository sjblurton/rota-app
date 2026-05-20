import { type Session } from '@supabase/supabase-js'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

type HomePagePresentationProps = {
  session: Session | null
  isLoading: boolean
}
export const HomePresentationPage = ({ session, isLoading }: HomePagePresentationProps) => {
  return (
    <Container>
      <Stack spacing={2} sx={{ py: 6 }}>
        <Typography variant="h1">Rota App</Typography>

        {isLoading ? (
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <CircularProgress size={20} aria-labelledby="loading-session-label" />
            <Typography id="loading-session-label">Loading session...</Typography>
          </Stack>
        ) : session?.user ? (
          <Typography>Welcome, {session.user.email}</Typography>
        ) : (
          <Typography>Please sign in to continue.</Typography>
        )}
      </Stack>
    </Container>
  )
}
