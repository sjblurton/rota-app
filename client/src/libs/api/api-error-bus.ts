type Listener = (message: string) => void

let listener: Listener | null = null

export function registerApiErrorListener(next: Listener | null) {
  listener = next
}

export function emitApiError(message: string) {
  listener?.(message)
}
