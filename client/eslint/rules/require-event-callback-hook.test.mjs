import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'

import requireEventCallbackHook from './require-event-callback-hook.mjs'

function verify({ code, filename = 'src/components/MyComponent.tsx' }) {
  const linter = new Linter()
  linter.defineRule('require-event-callback-hook', requireEventCallbackHook)

  return linter.verify(
    code,
    {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'require-event-callback-hook': 'error',
      },
    },
    { filename },
  )
}

describe('require-event-callback-hook', () => {
  it('reports void-returning function in React component file when not wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const handleClick = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe(
      "Function 'handleClick' should be wrapped in useEventCallback",
    )
  })

  it('should report void-returning function not wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const handleClick = () => {
          console.log('hello')
          return
        }
      `,
    })

    expect(messages).toHaveLength(1)
  })

  it('does not report void-returning function already wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const handleClick = useEventCallback(() => {
          console.log('hello')
        })
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('reports void-returning function wrapped in useCallback instead of useEventCallback', () => {
    const messages = verify({
      code: `
        const handleClick = useCallback(() => {
          console.log('hello')
        }, [])
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe(
      "Function 'handleClick' should be wrapped in useEventCallback",
    )
  })

  it('reports concise arrow function that is a block when unwrapped', () => {
    const messages = verify({
      code: `
        const handleClick = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe(
      "Function 'handleClick' should be wrapped in useEventCallback",
    )
  })

  it('does not report value-returning functions (handled by require-callback-hook)', () => {
    const messages = verify({
      code: `
        const getLabel = () => {
          return 'hello'
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('ignores custom hooks', () => {
    const messages = verify({
      code: `
        const useThing = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('ignores component declarations', () => {
    const messages = verify({
      code: `
        const MyComponent = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not run outside component and route file paths', () => {
    const messages = verify({
      filename: 'src/libs/helpers.ts',
      code: `
        const handleClick = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not report when wrapped in useEventCallback and has nested code', () => {
    const messages = verify({
      code: `
        const handleClick = useEventCallback(() => {
          function inner() {
            console.log('hello')
          }

          inner()
        })
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not report when value-returning function wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const getValue = useEventCallback(() => {
          return 'hello'
        })
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not report when void-returning function wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const handleClick = useEventCallback(() => {
          console.log('hello')
          return
        })
      `,
    })

    expect(messages).toHaveLength(0)
  })
})
