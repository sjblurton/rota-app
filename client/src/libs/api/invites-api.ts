import { api } from './axios-instance'

export async function patchInvite({
  body,
  inviteId,
  token,
}: {
  inviteId: string
  token: string
  body: { status: 'accepted' }
}) {
  return api.patch(`admin/invites/${inviteId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
