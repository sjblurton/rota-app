// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { App } from './index'

describe('index route', () => {
  it('mounts and shows the app title', () => {
    render(<App />)

    expect(screen.getByText('Rota App')).toBeTruthy()
  })
})
