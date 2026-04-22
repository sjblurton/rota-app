import { api } from './axios-instance';

export async function patchInvite(inviteId: string, token: string) {
  return api.patch(`/invites/${inviteId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
