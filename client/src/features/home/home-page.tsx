import { HomePresentationPage } from './home-page.presentation'
import { useSession } from '#/hooks/useSession/useSession.ts'

export function HomePage() {
  const { session, isLoading } = useSession()

  return <HomePresentationPage session={session} isLoading={isLoading} />
}
