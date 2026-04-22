import { createFileRoute } from '@tanstack/react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { supabase } from '#/libs/auth/supabase'

export const Route = createFileRoute('/')({ component: App })

export async function App() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography>Rota App</Typography>
        {user ? (
          <Typography>Welcome, {user.email}</Typography>
        ) : (
          <Typography>Please sign in to continue.</Typography>
        )}
        {error && <Typography color="error">Error: {error.message}</Typography>}
      </Container>
    </>
  )
}
