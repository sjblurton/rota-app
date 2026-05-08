import { api } from '../axios-instance'
import { type Invite } from '#/libs/api/invites/@types/invites'

/**
 * Accepts an invite by patching its status to accepted.
 *
 * Sends an authenticated PATCH request to the admin invites endpoint.
 *
 * @param params - Request parameters.
 * @param params.inviteId - The invite identifier.
 * @param params.token - Bearer token used for API authorisation.
 * @param params.body - Request payload containing the new invite status.
 * @returns A promise resolving to the API patch response.
 */
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

/**
 * Fetches a single invite by id.
 *
 * Sends a GET request to the admin invites endpoint.
 *
 * @param params - Request parameters.
 * @param params.inviteId - The invite identifier.
 * @returns A promise resolving to the API get response for the invite.
 */
export async function getInvite({ inviteId }: { inviteId: string }): Promise<Invite> {
  const response = await api.get<Invite>(`admin/invites/${inviteId}`)
  return response.data
}
