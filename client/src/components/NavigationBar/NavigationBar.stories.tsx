import { useEffect, useRef, useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, fn, screen, userEvent, within } from 'storybook/test'
import { NavigationBarPresentation } from './NavigationBar.presentation'

const onClicks = {
  staff: fn(),
  rotas: fn(),
  settings: fn(),
  logout: fn(),
  openUserMenu: fn(),
  closeUserMenu: fn(),
}

const meta = {
  tags: ['autodocs'],
  args: {
    pages: [
      { label: 'Staff', onClick: onClicks.staff },
      { label: 'Rotas', onClick: onClicks.rotas },
    ],
    settings: [
      { label: 'Settings', onClick: onClicks.settings },
      { label: 'Logout', onClick: onClicks.logout },
    ],
    onOpenUserMenu: onClicks.openUserMenu,
    onCloseUserMenu: onClicks.closeUserMenu,
    userName: 'User',
  },
  argTypes: {
    onOpenUserMenu: {
      action: 'openUserMenu',
      description:
        'Callback fired when the user menu is opened. Receives the open event as an argument.',
    },
    onCloseUserMenu: {
      action: 'closeUserMenu',
      description: 'Callback fired when the user menu is closed.',
    },
    pages: {
      control: false,
      description:
        'The navigation items to display in the main navigation bar, and their corresponding actions.',
    },
    settings: {
      control: false,
      description:
        'The navigation items to display in the user menu, and their corresponding actions.',
    },
    menu: {
      control: false,
      description:
        'The anchor element for the user menu. If provided, the menu will be controlled by this prop instead of internal state.',
    },
  },
  component: NavigationBarPresentation,
} satisfies Meta<typeof NavigationBarPresentation>

export default meta

type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const userButton = await canvas.findByRole('button', { name: /u/i })
    await userEvent.click(userButton)
    await expect(onClicks.openUserMenu).toHaveBeenCalled()
    await expect(await screen.findByRole('menuitem', { name: 'Settings' })).toBeInTheDocument()
  },
}

export const Controlled: Story = {
  render: function Render(args) {
    const [menu, setMenu] = useState<HTMLElement | null>(null)

    return (
      <NavigationBarPresentation
        {...args}
        menu={menu}
        onOpenUserMenu={(event) => {
          args.onOpenUserMenu?.(event)
          setMenu(event.currentTarget)
        }}
        onCloseUserMenu={() => {
          args.onCloseUserMenu?.()
          setMenu(null)
        }}
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const userButton = await canvas.findByRole('button', { name: /u/i })
    await userEvent.click(userButton)
    await expect(onClicks.openUserMenu).toHaveBeenCalled()
    await expect(await screen.findByRole('menuitem', { name: 'Logout' })).toBeInTheDocument()
  },
}

export const UserName: Story = {
  args: {
    userName: 'Alice Smith',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = await canvas.findByText('AS')
    await expect(avatar).toBeInTheDocument()
  },
}

export const OpenUserMenu: Story = {
  render: function Render(args) {
    const [menu, setMenu] = useState<HTMLElement | null>(null)
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (menu || !containerRef.current) return

      const avatarButton = Array.from(containerRef.current.querySelectorAll('button')).find(
        (buttonElement) => buttonElement.textContent.trim() === 'U',
      )

      if (avatarButton instanceof HTMLElement) {
        setMenu(avatarButton)
      }
    }, [menu])

    return (
      <div ref={containerRef}>
        <NavigationBarPresentation {...args} menu={menu} />
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    void canvasElement
    await expect(await screen.findByRole('menuitem', { name: 'Settings' })).toBeInTheDocument()
  },
}
