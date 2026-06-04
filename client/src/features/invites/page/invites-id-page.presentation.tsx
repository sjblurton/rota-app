import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { APP_NAME } from '#/constants/strings/app-name.ts'

type InviteIdPresentationPageProps = {
  errorMessage: string | null
  isLoading: boolean
  canRetry: boolean
  retry: () => void
}

export const InviteIdPagePresentation = ({
  errorMessage,
  isLoading,
  canRetry,
  retry,
}: InviteIdPresentationPageProps) => {
  if (isLoading) {
    return (
      <Container>
        <Typography variant="h1" gutterBottom>
          {APP_NAME}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <CircularProgress size={20} aria-label="Accepting invite" />
          <Typography>Accepting your invite...</Typography>
        </Stack>
      </Container>
    )
  }

  if (!errorMessage) {
    return (
      <Container>
        <Typography variant="h1" gutterBottom>
          {APP_NAME}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <CircularProgress size={20} aria-label="Redirecting" />
          <Typography>Successfully accepted your invite! Redirecting...</Typography>
        </Stack>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        {APP_NAME}
      </Typography>
      <Stack spacing={4}>
        <Typography>We could not accept your invite.</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          {canRetry && (
            <Button fullWidth variant="contained" color="primary" onClick={retry}>
              Retry
            </Button>
          )}
          <Typography color="error">{errorMessage}</Typography>
        </Box>
      </Stack>
    </Container>
  )
}
