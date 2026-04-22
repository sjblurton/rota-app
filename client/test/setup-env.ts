import { vi } from 'vitest'

vi.mock('../src/libs/auth/supabase', () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
      getUser: vi.fn(),
    },
  },
}))
