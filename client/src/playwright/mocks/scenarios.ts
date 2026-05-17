import { type Session } from '@supabase/supabase-js'
import { type PlaywrightAuthScenario, type PlaywrightScenario } from './constants'

type PlaywrightAuthOverride = {
  isLoading: boolean
  session: null | Session
}

type InviteScenario = {
  getInviteStatus: number
  invite: MockInvite
  patchInviteStatus: number
}

type MockInvite = {
  accepted_by_user_id?: string
  created_at: string
  email: string
  expires_at: string
  id: string
  invited_by_user_id?: string
  organisation_id: string
  preferred_contact_method: 'email'
  role: 'admin'
  status: 'accepted' | 'expired' | 'invited' | 'revoked'
  updated_at: string
}

const baseInvite: MockInvite = {
  accepted_by_user_id: undefined,
  created_at: '2026-01-01T00:00:00.000Z',
  email: 'member@example.com',
  expires_at: '2026-12-31T00:00:00.000Z',
  id: 'invite-1',
  invited_by_user_id: 'admin-1',
  organisation_id: 'org-1',
  preferred_contact_method: 'email',
  role: 'admin',
  status: 'invited',
  updated_at: '2026-01-01T00:00:00.000Z',
}

const baseSession: Session = {
  access_token: 'playwright-access-token',
  refresh_token: 'playwright-refresh-token',
  expires_in: 3600,
  expires_at: 1_767_225_600,
  token_type: 'bearer',
  user: {
    id: 'playwright-user-id',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    email: 'playwright.user@example.com',
    created_at: '2026-01-01T00:00:00.000Z',
  },
}

export function buildAuthOverrideForScenario(
  scenario: PlaywrightAuthScenario,
): PlaywrightAuthOverride {
  switch (scenario) {
    case 'auth-signed-out': {
      return {
        session: null,
        isLoading: false,
      }
    }

    case 'auth-signed-in': {
      return {
        session: baseSession,
        isLoading: false,
      }
    }
  }
}

export function buildInviteScenario(scenario: PlaywrightScenario): InviteScenario {
  switch (scenario) {
    case 'invite-revoked': {
      return {
        getInviteStatus: 200,
        invite: {
          ...baseInvite,
          status: 'revoked',
        },
        patchInviteStatus: 409,
      }
    }

    case 'invite-expired': {
      return {
        getInviteStatus: 200,
        invite: {
          ...baseInvite,
          status: 'expired',
        },
        patchInviteStatus: 409,
      }
    }

    case 'invite-api-error': {
      return {
        getInviteStatus: 500,
        invite: {
          ...baseInvite,
          status: 'invited',
        },
        patchInviteStatus: 500,
      }
    }

    case 'invite-invited': {
      return {
        getInviteStatus: 200,
        invite: {
          ...baseInvite,
          status: 'invited',
        },
        patchInviteStatus: 200,
      }
    }
  }
}

export function inviteIdForScenario(scenario: PlaywrightScenario): string {
  switch (scenario) {
    case 'invite-api-error': {
      return 'invite-api-error'
    }

    case 'invite-expired': {
      return 'invite-expired'
    }

    case 'invite-revoked': {
      return 'invite-revoked'
    }

    case 'invite-invited': {
      return 'invite-invited'
    }
  }
}

export function parseScenarioFromInviteId(inviteId: string): PlaywrightScenario {
  if (inviteId.endsWith('api-error')) {
    return 'invite-api-error'
  }

  if (inviteId.endsWith('expired')) {
    return 'invite-expired'
  }

  if (inviteId.endsWith('revoked')) {
    return 'invite-revoked'
  }

  return 'invite-invited'
}
