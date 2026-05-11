import { IconButton, useEventCallback } from '@mui/material'
import Alert from '@mui/material/Alert'
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  errorMessage: string | null
  onClose: () => void
}

export const ApiErrorSnackbarPresentation = ({ errorMessage, onClose }: Props) => {
  const handleClose = useEventCallback(
    (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === 'clickaway') {
        return
      }
      onClose()
    },
  )

  return (
    <Snackbar
      open={Boolean(errorMessage)}
      onClose={handleClose}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        severity="error"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  )
}
