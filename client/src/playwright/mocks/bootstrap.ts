import { PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY } from './constants'

let workerStartPromise: null | Promise<void> = null

export async function startPlaywrightMswIfEnabled() {
  if (typeof window === 'undefined') {
    return
  }

  if (window.localStorage.getItem(PLAYWRIGHT_ENABLE_MOCKS_STORAGE_KEY) !== 'true') {
    return
  }

  workerStartPromise ??= import('./browser')
    .then(({ worker }) =>
      worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      }),
    )
    .then(() => undefined)

  await workerStartPromise
}
