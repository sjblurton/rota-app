import { type Session } from '@supabase/supabase-js'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { HomePresentationPage } from './home-page.presentation'

const signedInSession = {
  user: {
    email: 'alice@example.com',
  },
} as Session

const meta = {
  title: 'Features/Home/HomePresentationPage',
  tags: ['autodocs'],
  component: HomePresentationPage,
  args: {
    isLoading: false,
    session: null,
  },
} satisfies Meta<typeof HomePresentationPage>

export default meta

type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    isLoading: true,
    session: null,
  },
  play: async ({ canvasElement }) => {
    const { getByLabelText } = within(canvasElement)
    const loadingIndicator = getByLabelText('Loading session...')
    await expect(loadingIndicator).toBeInTheDocument()
  },
}

export const SignedIn: Story = {
  args: {
    isLoading: false,
    session: signedInSession,
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    const welcomeMessage = getByText(/welcome/i)
    await expect(welcomeMessage).toBeInTheDocument()
    await expect(welcomeMessage).toHaveTextContent(signedInSession.user.email!)
  },
}

export const SignedOut: Story = {
  args: {
    isLoading: false,
    session: null,
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    const signInMessage = getByText(/please sign in/i)
    await expect(signInMessage).toBeInTheDocument()
  },
}
