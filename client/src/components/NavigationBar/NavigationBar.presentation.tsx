import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { useEventCallback } from '@mui/material/utils'
import ScheduleIcon from '@mui/icons-material/Schedule'
import { useControlledState } from '#/hooks/useControlledState/useControlledState'
import { getInitials } from '#/utils/strings/getInitials.ts'

export type NavigationBarPage = {
  label: string
  onClick?: () => void
}
export type NavigationBarSetting = {
  label: string
  onClick?: () => void
}
export type NavigationBarPresentationProps = {
  pages: Array<NavigationBarPage>
  settings: Array<NavigationBarSetting>
  onOpenUserMenu?: (event: React.MouseEvent<HTMLElement>) => void
  onCloseUserMenu?: () => void
  userName?: string
  menu?: null | HTMLElement
}

export function NavigationBarPresentation({
  pages,
  settings,
  onOpenUserMenu,
  onCloseUserMenu,
  userName = 'User',
  menu,
}: NavigationBarPresentationProps) {
  const [activeMenu, setActiveMenu] = useControlledState<HTMLElement | null>({
    value: menu,
    defaultValue: null,
  })

  const handleOpenUserMenu = useEventCallback((event: React.MouseEvent<HTMLElement>) => {
    setActiveMenu(event.currentTarget)
    onOpenUserMenu?.(event)
  })

  const handleCloseUserMenu = useEventCallback(() => {
    setActiveMenu(null)
    onCloseUserMenu?.()
  })

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ScheduleIcon sx={{ display: 'flex', mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ROTA
          </Typography>

          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', mr: 4 }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={page.onClick}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt={userName}>{getInitials(userName)}</Avatar>
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={activeMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(activeMenu)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onClick}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
