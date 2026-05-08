import { useEffect, useMemo, useState } from 'react'
import { registerApiErrorListener } from '#/libs/api/api-error-bus'

/**
 * Connects to the global API error bus and exposes the latest error message.
 *
 * Private hook used exclusively by `ApiErrorSnackbar`.
 * Registers a listener on mount and unregisters it on unmount.
 *
 * `ApiErrorSnackbar` is rendered once in `RootDocument`, which ensures
 * only one listener is ever active at a time. Do not use this hook directly.
 *
 * @returns An object containing:
 * - `errorMessage` — the latest API error string, or null when there is no error.
 * - `clearError` — a function to dismiss the current error.
 *
 * @example
 * const { errorMessage, clearError } = useApiErrorBus()
 *
 * <Snackbar open={!!errorMessage} onClose={clearError}>
 *   <Alert severity="error">{errorMessage}</Alert>
 * </Snackbar>
 */
export const useApiErrorBus = () => {
  const [error, setError] = useState<string | null>(null)

  const handleClearError = useMemo(() => () => setError(null), [])

  useEffect(() => {
    registerApiErrorListener(setError)
    return () => {
      registerApiErrorListener(null)
    }
  }, [])

  return { errorMessage: error, clearError: handleClearError }
}
