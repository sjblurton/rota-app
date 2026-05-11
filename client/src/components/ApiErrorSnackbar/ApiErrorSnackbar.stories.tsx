import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { ApiErrorSnackbarPresentation } from './ApiErrorSnackbar.presentation'

const meta = {
  tags: ['autodocs'],
  component: ApiErrorSnackbarPresentation,
  args: {
    onClose: fn(),
  },
  parameters: {
    docs: {
      story: {
        height: '150px',
      },
    },
  },
} satisfies Meta<typeof ApiErrorSnackbarPresentation>

export default meta

type Story = StoryObj<typeof meta>

export const WithError: Story = {
  args: {
    errorMessage: 'Something went wrong. Please try again.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const alert = await canvas.findByRole('alert')
    const closeButton = await canvas.findByRole('button', { name: /close/i })
    await expect(alert).toHaveTextContent('Something went wrong. Please try again.')
    await userEvent.click(closeButton)
    await expect(meta.args.onClose).toHaveBeenCalled()
  },
}

export const LongMessage: Story = {
  args: {
    errorMessage:
      'Request failed with status 500: Internal Server Error. The server encountered an unexpected condition that prevented it from fulfilling the request.',
  },
  play: async ({ args }) => {
    await userEvent.click(document.body)
    await expect(args.onClose).not.toHaveBeenCalled()
    await expect(screen.getByRole('alert')).toBeInTheDocument()
  },
}
