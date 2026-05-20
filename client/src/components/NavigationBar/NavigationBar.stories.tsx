import { useEffect, useRef, useState } from 'react'
import { type Meta, type StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, within } from 'storybook/test'
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

  component: NavigationBarPresentation,
} satisfies Meta<typeof NavigationBarPresentation>

export default meta

type Story = StoryObj<typeof meta>

export const Uncontrolled: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const userButton = await canvas.findByRole('button', { name: /user/i })
    await userEvent.click(userButton)
    await expect(onClicks.openUserMenu).toHaveBeenCalled()
    await expect(await canvas.findByText('Settings')).toBeInTheDocument()
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
    const userButton = await canvas.findByRole('button', { name: /user/i })
    await userEvent.click(userButton)
    await expect(onClicks.openUserMenu).toHaveBeenCalled()
    await expect(await canvas.findByText('Logout')).toBeInTheDocument()
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
    const canvas = within(canvasElement)
    await expect(await canvas.findByText('Settings')).toBeInTheDocument()
  },
}
