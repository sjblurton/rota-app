import { HttpResponse, http } from 'msw'
import { buildInviteScenario, parseScenarioFromInviteId } from './scenarios'

export const handlers = [
  http.get('*/api/v1/admin/invites/:invitesId', ({ params }) => {
    const invitesId = String(params.invitesId)
    const scenario = parseScenarioFromInviteId(invitesId)
    const inviteScenario = buildInviteScenario(scenario)

    if (inviteScenario.getInviteStatus >= 400) {
      return HttpResponse.json(
        { message: 'Mocked invite fetch failure.' },
        { status: inviteScenario.getInviteStatus },
      )
    }

    return HttpResponse.json(
      {
        ...inviteScenario.invite,
        id: invitesId,
      },
      { status: inviteScenario.getInviteStatus },
    )
  }),

  http.patch('*/api/v1/admin/invites/:invitesId', ({ params }) => {
    const invitesId = String(params.invitesId)
    const scenario = parseScenarioFromInviteId(invitesId)
    const inviteScenario = buildInviteScenario(scenario)

    if (inviteScenario.patchInviteStatus >= 400) {
      return HttpResponse.json(
        { message: 'Mocked invite patch failure.' },
        { status: inviteScenario.patchInviteStatus },
      )
    }

    return HttpResponse.json(
      {
        ...inviteScenario.invite,
        id: invitesId,
        status: 'accepted',
      },
      { status: inviteScenario.patchInviteStatus },
    )
  }),
]
