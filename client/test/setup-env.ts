import { vi } from 'vitest'

vi.mock('../src/libs/auth/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(() => ({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      })),
      getUser: vi.fn(async () => ({
        data: { user: null },
        error: null,
      })),
      signInWithOtp: vi.fn(async () => ({ error: null })),
    },
  },
}))
