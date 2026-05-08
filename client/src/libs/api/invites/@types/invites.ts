type Role = 'admin'

type InviteStatus = 'invited' | 'accepted' | 'revoked' | 'expired'

type PreferenceContactMethod = 'email'

export type Invite = {
  id: string
  created_at: string
  updated_at: string
  email: string
  organisation_id: string
  role: Role
  status: InviteStatus
  expires_at: string
  preferred_contact_method: PreferenceContactMethod
  invited_by_user_id?: string
  accepted_by_user_id?: string
}
