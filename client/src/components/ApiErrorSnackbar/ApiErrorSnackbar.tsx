import { useApiErrorBus } from '#/components/ApiErrorSnackbar/hooks/useApiErrorBus/useApiErrorBus'
import { ApiErrorSnackbarPresentation } from '#/components/ApiErrorSnackbar/ApiErrorSnackbar.presentation'

/**
 * Global error Snackbar that displays API error messages.
 *
 * Listens to the API error bus via `useApiErrorBus` and renders a MUI Snackbar
 * when an Axios request fails. Dismisses automatically when `clearError` is called.
 *
 * Rendered once in `RootDocument` — do not mount this component more than once.
 */
export const ApiErrorSnackbar = () => {
  const { errorMessage, clearError } = useApiErrorBus()

  return <ApiErrorSnackbarPresentation errorMessage={errorMessage} onClose={clearError} />
}
