import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, screen, userEvent, within } from 'storybook/test'
import { TruncatedText } from './TruncatedText'

const meta = {
  tags: ['autodocs'],
  component: TruncatedText,
  args: {
    maxWidth: '300px',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textElement = await canvas.findByText(/Lorem ipsum/)
    await expect(textElement).toHaveStyle({
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    })
  },
} satisfies Meta<typeof TruncatedText>

export default meta

type Story = StoryObj<typeof meta>

export const Truncated: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textElement = await canvas.findByText(/Lorem ipsum/)
    await userEvent.hover(textElement)
    const tooltip = await screen.findByRole('tooltip')
    await expect(tooltip).toHaveTextContent(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    )
  },
}

export const ShortText: Story = {
  args: {
    text: 'Short text.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textElement = await canvas.findByText(/Short text/i)
    await userEvent.hover(textElement)
    const tooltip = screen.queryByRole('tooltip')
    await expect(tooltip).toBeNull()
  },
}
