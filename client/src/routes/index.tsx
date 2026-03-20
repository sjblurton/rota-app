import { createFileRoute } from '@tanstack/react-router'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography>Rota App</Typography>
      </Container>
    </>
  )
}
