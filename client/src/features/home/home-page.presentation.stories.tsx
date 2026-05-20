import { type Session } from '@supabase/supabase-js'
import { type Meta, type StoryObj } from '@storybook/react-vite'
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
}

export const SignedIn: Story = {
  args: {
    isLoading: false,
    session: signedInSession,
  },
}

export const SignedOut: Story = {
  args: {
    isLoading: false,
    session: null,
  },
}
