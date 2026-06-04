import { HomePagePresentation } from './home-page.presentation'
import { useSession } from '#/hooks/useSession/useSession.ts'

export function HomePage() {
  const { session, isLoading } = useSession()

  return <HomePagePresentation session={session} isLoading={isLoading} />
}
