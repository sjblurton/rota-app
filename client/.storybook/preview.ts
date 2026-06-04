import { createElement } from 'react'
import { themes } from 'storybook/theming'
import type { Preview } from '@storybook/react-vite'
import { ThemeProvider } from '#/libs/theme/ThemeProvider.tsx'

const preview: Preview = {
  decorators: [
    (Story) => {
      return createElement(ThemeProvider, null, createElement(Story))
    },
  ],
  parameters: {
    a11y: { test: 'error' },
    docs: {
      theme: themes.dark,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
