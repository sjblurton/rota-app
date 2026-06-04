import { type Meta, type StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { InviteIdPagePresentation } from '../page/invites-id-page.presentation'

const ERROR_MESSAGES = {
  genericError: 'Something went wrong. Please try again.',
  expiredError: 'This invite has expired.',
}

const meta = {
  title: 'Features/Invites/Invite By Id Page',
  tags: ['autodocs'],
  component: InviteIdPagePresentation,
  args: {
    errorMessage: null,
    isLoading: false,
    canRetry: false,
    retry: fn(),
  },
  argTypes: {
    errorMessage: {
      description:
        'The error message to display if accepting the invite fails. If null, no error is shown and the user is redirected.',
      control: {
        type: 'select',
        labels: {
          none: 'No error',
          genericError: 'Generic error',
          expiredError: 'Expired invite',
        },
      },
      options: ['none', 'genericError', 'expiredError'],
      mapping: {
        none: null,
        genericError: ERROR_MESSAGES.genericError,
        expiredError: ERROR_MESSAGES.expiredError,
      },
    },
    isLoading: {
      description: 'Whether the invite acceptance is currently in progress.',
    },
    canRetry: {
      description:
        'Whether the user should be given the option to retry accepting the invite if it fails.',
    },
    retry: {
      action: 'retry',
      description: 'Callback fired when the user clicks the retry button.',
      control: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof InviteIdPagePresentation>

export default meta

type Story = StoryObj<typeof meta>

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const ErrorWithRetry: Story = {
  args: {
    isLoading: false,
    errorMessage: ERROR_MESSAGES.genericError,
    canRetry: true,
  },
}

export const ErrorNoRetry: Story = {
  args: {
    isLoading: false,
    errorMessage: ERROR_MESSAGES.expiredError,
    canRetry: false,
  },
}

export const NoError: Story = {
  args: {
    isLoading: false,
    errorMessage: null,
    canRetry: false,
  },
}
