import { isAxiosError } from 'axios'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type {ReactNode} from 'react';
import { emitApiError } from '#/libs/api/api-error-bus'

type ApiErrorResponse = {
  code?: string
  message?: string
  detail?: string
}

const onError = (error: unknown) => {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const message =
      error.response?.data.detail ??
      error.response?.data.message ??
      'Something went wrong. Please try again.'
    emitApiError(message)
  }
}

let context:
  | {
      queryClient: QueryClient
    }
  | undefined

export function getContext() {
  if (context) {
    return context
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({ onError }),
    mutationCache: new MutationCache({ onError }),
  })

  context = {
    queryClient,
  }

  return context
}

export default function TanStackQueryProvider({ children }: { children: ReactNode }) {
  const { queryClient } = getContext()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
