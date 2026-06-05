import { expect, within } from 'storybook/test'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { DashboardStatCard } from './DashboardStatCard'

const meta = {
  tags: ['autodocs'],
  component: DashboardStatCard,
  decorators: [
    (Story) => (
      <div style={{ width: 'fit-content', minWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      description: 'The title of the statistic being displayed.',
    },
    primaryValue: {
      description: 'The main value to display for the statistic.',
    },
    secondaryValue: {
      description: 'An optional secondary value to provide additional context.',
    },
    status: {
      description:
        'An optional status to indicate the state of the statistic. Displays as a coloured chip.',
      control: {
        type: 'select',
        labels: {
          draft: 'Draft',
          published: 'Published',
          archived: 'Archived',
        },
      },
      options: ['draft', 'published', 'archived'],
      mapping: {
        draft: { label: 'Draft', color: 'warning' },
        published: { label: 'Published', color: 'success' },
        archived: { label: 'Archived', color: 'default' },
      },
    },
    progress: {
      description:
        'An optional progress value (0-100) to display a progress bar indicating completion towards a goal.',
      control: {
        type: 'number',
        min: 0,
        max: 100,
      },
    },
  },
} satisfies Meta<typeof DashboardStatCard>

export default meta

type Story = StoryObj<typeof DashboardStatCard>

export const Staff: Story = {
  args: {
    title: 'Staff',
    primaryValue: '25 active',
    secondaryValue: '5 inactive',
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    await expect(getByText('Staff')).toBeInTheDocument()
    await expect(getByText('25 active')).toBeInTheDocument()
    await expect(getByText('5 inactive')).toBeInTheDocument()
  },
}

export const CurrentRotaDraft: Story = {
  args: {
    title: 'Current Rota',
    primaryValue: 'Week of 1st Jan',
    status: { label: 'Draft', color: 'warning' },
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    const statusChip = getByText('Draft').parentElement
    await expect(statusChip).toBeInTheDocument()
    await expect(statusChip).toHaveClass('MuiChip-colorWarning')
  },
}

export const RotaCompletion: Story = {
  args: {
    title: 'Current Rota',
    primaryValue: 'Week of 1st Jan',
    status: { label: 'Published', color: 'success' },
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    const statusChip = getByText('Published').parentElement
    await expect(statusChip).toBeInTheDocument()
    await expect(statusChip).toHaveClass('MuiChip-colorSuccess')
  },
}

export const RotaArchived: Story = {
  args: {
    title: 'Previous Rota',
    primaryValue: 'Week of 25th Dec',
    status: { label: 'Archived', color: 'default' },
  },
  play: async ({ canvasElement }) => {
    const { getByText } = within(canvasElement)
    const statusChip = getByText('Archived').parentElement
    await expect(statusChip).toBeInTheDocument()
    await expect(statusChip).toHaveClass('MuiChip-colorDefault')
  },
}

export const SmsUsage: Story = {
  args: {
    title: 'SMS Usage',
    primaryValue: '32 / 100',
    progress: 32,
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement)
    const progressBar = getByRole('progressbar')
    await expect(progressBar).toBeInTheDocument()
    await expect(progressBar).toHaveAttribute('aria-valuenow', '32')
  },
}

export const RotaStaffResponses: Story = {
  args: {
    title: 'Rota Staff Responses',
    primaryValue: '20 / 25 Responded',
    progress: 80,
  },
  play: async ({ canvasElement }) => {
    const { getByRole } = within(canvasElement)
    const progressBar = getByRole('progressbar')
    await expect(progressBar).toBeInTheDocument()
    await expect(progressBar).toHaveAttribute('aria-valuenow', '80')
  },
}
