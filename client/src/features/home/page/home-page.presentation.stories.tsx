import { type Session } from '@supabase/supabase-js'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'
import { HomePagePresentation } from '../page/home-page.presentation'

const signedInSession = {
  user: {
    email: 'alice@example.com',
  },
} as Session

const meta = {
  title: 'Features/Home/Home Page',
  tags: ['autodocs'],
  component: HomePagePresentation,
  args: {
    isLoading: false,
    session: null,
  },
  argTypes: {
    session: {
      description:
        'The current user session. If `null`, the user is signed out. If a Session object, the user is signed in.',
      control: {
        type: 'select',
        labels: {
          signedOut: 'Signed out',
          signedIn: 'Signed in',
        },
      },
      options: ['signedOut', 'signedIn'],
      defaultValue: 'signedOut',
      mapping: {
        signedOut: null,
        signedIn: signedInSession,
      },
    },
    isLoading: {
      description:
        'Whether the session state is currently being loaded. Should be `true` until the initial session state has been determined.',
    },
  },
} satisfies Meta<typeof HomePagePresentation>

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
