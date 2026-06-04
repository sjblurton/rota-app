import { act, renderHook, waitFor } from '@testing-library/react'
import { useNavigate } from '@tanstack/react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type Session } from '@supabase/supabase-js'
import { useAcceptInvite } from '../useAcceptInvite/useAcceptInvite'
import { useGetInviteById } from '../useGetInviteById/useGetInviteById'
import { useInviteById } from './useInviteById'
import { type Invite } from '#/libs/api/invites/@types/invites'
import { useSession } from '#/hooks/useSession/useSession'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: vi.fn(),
}))

vi.mock('#/features/invites/hooks/useAcceptInvite/useAcceptInvite', () => ({
  useAcceptInvite: vi.fn(),
}))

vi.mock('#/features/invites/hooks/useGetInviteById/useGetInviteById', () => ({
  useGetInviteById: vi.fn(),
}))

vi.mock('#/hooks/useSession/useSession', () => ({
  useSession: vi.fn(),
}))

const buildInvite = (status: Invite['status']): Invite => ({
  id: 'invite-1',
  created_at: '2026-01-01T00:00:00.000Z',
  updated_at: '2026-01-01T00:00:00.000Z',
  email: 'user@example.com',
  organisation_id: 'org-1',
  role: 'admin',
  status,
  expires_at: '2026-12-31T23:59:59.000Z',
  preferred_contact_method: 'email',
})

describe('useInviteById', () => {
  const navigate = vi.fn()
  const mutate = vi.fn()
  const refetch = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useNavigate).mockReturnValue(navigate)
    vi.mocked(useSession).mockReturnValue({ session: null, isLoading: false })
    vi.mocked(useAcceptInvite).mockReturnValue({
      mutate,
      isError: false,
      status: 'idle',
    } as any)
    vi.mocked(useGetInviteById).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch,
    } as any)
  })

  it('navigates immediately when invite status is accepted', async () => {
    vi.mocked(useSession).mockReturnValue({
      session: { access_token: 'token' } as unknown as Session,
      isLoading: false,
    })
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('accepted'),
      isError: false,
      isLoading: false,
    } as any)

    renderHook(() => useInviteById('invite-1'))

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith({ to: '/' })
    })
    expect(mutate).not.toHaveBeenCalled()
  })

  it('accepts invited invites and navigates on mutation success', async () => {
    vi.mocked(useSession).mockReturnValue({
      session: { access_token: 'token' } as unknown as Session,
      isLoading: false,
    })
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('invited'),
      isError: false,
      isLoading: false,
    } as any)

    renderHook(() => useInviteById('invite-1'))

    await waitFor(() => {
      expect(mutate).toHaveBeenCalledWith(
        { inviteId: 'invite-1', token: 'token', body: { status: 'accepted' } },
        expect.objectContaining({ onSuccess: expect.any(Function) }),
      )
    })

    const options = mutate.mock.calls[0]?.[1] as { onSuccess?: () => void }

    act(() => {
      options.onSuccess?.()
    })

    expect(navigate).toHaveBeenCalledWith({ to: '/' })
  })

  it('returns an expired message when invite is expired', () => {
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('expired'),
      isError: false,
      isLoading: false,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.errorMessage).toBe('This invite has expired.')
  })

  it('returns a revoked message when invite is revoked', () => {
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('revoked'),
      isError: false,
      isLoading: false,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.errorMessage).toBe('This invite has been revoked.')
  })

  it('returns a generic error message when invite or accept request fails', () => {
    vi.mocked(useGetInviteById).mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.errorMessage).toBe('Something went wrong. Please try again.')
  })

  it('combines all loading states into isLoading', () => {
    vi.mocked(useSession).mockReturnValue({ session: null, isLoading: true })
    vi.mocked(useAcceptInvite).mockReturnValue({
      mutate,
      isError: false,
      status: 'pending',
    } as any)
    vi.mocked(useGetInviteById).mockReturnValue({
      data: undefined,
      isError: false,
      isLoading: true,
      isFetching: false,
      refetch,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.isLoading).toBe(true)
  })

  it('exposes retry and refetches invite when invite query fails', () => {
    vi.mocked(useSession).mockReturnValue({
      session: { access_token: 'token' } as unknown as Session,
      isLoading: false,
    })
    vi.mocked(useGetInviteById).mockReturnValue({
      data: undefined,
      isError: true,
      isLoading: false,
      isFetching: false,
      refetch,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.canRetry).toBe(true)

    act(() => {
      result.current.retry()
    })

    expect(refetch).toHaveBeenCalledTimes(1)
    expect(mutate).not.toHaveBeenCalled()
  })

  it('retries accepting invite when mutation failed and session is available', () => {
    vi.mocked(useSession).mockReturnValue({
      session: { access_token: 'token' } as unknown as Session,
      isLoading: false,
    })
    vi.mocked(useAcceptInvite).mockReturnValue({
      mutate,
      isError: true,
      status: 'error',
    } as any)
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('invited'),
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.canRetry).toBe(true)

    act(() => {
      result.current.retry()
    })

    expect(mutate).toHaveBeenCalledWith(
      { inviteId: 'invite-1', token: 'token', body: { status: 'accepted' } },
      expect.objectContaining({ onSuccess: expect.any(Function) }),
    )
  })

  it('does not allow retrying accept when session is missing', () => {
    vi.mocked(useSession).mockReturnValue({ session: null, isLoading: false })
    vi.mocked(useAcceptInvite).mockReturnValue({
      mutate,
      isError: true,
      status: 'error',
    } as any)
    vi.mocked(useGetInviteById).mockReturnValue({
      data: buildInvite('invited'),
      isError: false,
      isLoading: false,
      isFetching: false,
      refetch,
    } as any)

    const { result } = renderHook(() => useInviteById('invite-1'))

    expect(result.current.canRetry).toBe(false)

    act(() => {
      result.current.retry()
    })

    expect(mutate).not.toHaveBeenCalled()
  })
})
