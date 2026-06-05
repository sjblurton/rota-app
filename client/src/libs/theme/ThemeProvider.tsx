import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#161616',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow:
            'rgba(180, 180, 180, 0.2) 0px 1px 1px 0px, rgba(180, 180, 180, 0.2) 0px 1px 2px 1px',
        },
      },
    },
  },
})

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
