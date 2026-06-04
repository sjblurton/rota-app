import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { TruncatedTextPresentation } from './TruncatedText.presentation'

const handleMouseEnter = fn()

const meta = {
  tags: ['autodocs'],
  component: TruncatedTextPresentation,
  args: {
    maxWidth: '300px',
    handleMouseEnter,
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
} satisfies Meta<typeof TruncatedTextPresentation>

export default meta

type Story = StoryObj<typeof meta>

export const Truncated: Story = {
  args: {
    isTruncated: true,
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
    isTruncated: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textElement = await canvas.findByText(/Short text/)
    await userEvent.hover(textElement)
    const tooltip = screen.queryByRole('tooltip')
    await expect(tooltip).toBeNull()
  },
}
