import { createFileRoute } from '@tanstack/react-router'
import { InviteIdPage } from '#/features/invites/page/invites-id-page.tsx'

export const Route = createFileRoute('/invites/$invitesId/')({
  component: InvitePage,
})

function InvitePage() {
  const { invitesId } = Route.useParams()
  return <InviteIdPage invitesId={invitesId} />
}
