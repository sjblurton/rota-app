import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'

import requireCallbackHook from './require-callback-hook.mjs'

function verify({ code, filename = 'src/components/MyComponent.tsx' }) {
  const linter = new Linter()
  linter.defineRule('require-callback-hook', requireCallbackHook)

  return linter.verify(
    code,
    {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'require-callback-hook': 'error',
      },
    },
    { filename },
  )
}

describe('require-callback-hook', () => {
  it('reports value-returning function in React component file when not wrapped in useCallback', () => {
    const messages = verify({
      code: `
        const getLabel = () => {
          return 'hello'
        }
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe("Function 'getLabel' should be wrapped in useCallback")
  })

  it('does not report value-returning function already wrapped in useCallback', () => {
    const messages = verify({
      code: `
        const getLabel = useCallback(() => {
          return 'hello'
        }, [])
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('reports value-returning function wrapped in useEventCallback', () => {
    const messages = verify({
      code: `
        const getLabel = useEventCallback(() => {
          return 'hello'
        })
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe("Function 'getLabel' should be wrapped in useCallback")
  })

  it('reports concise arrow function returning a value when unwrapped', () => {
    const messages = verify({
      code: `
        const getLabel = () => 'hello'
      `,
    })

    expect(messages).toHaveLength(1)
    expect(messages[0]?.message).toBe("Function 'getLabel' should be wrapped in useCallback")
  })

  it('does not need a useCallback when not returning a value', () => {
    const messages = verify({
      code: `
        const handleClick = () => {
          console.log('hello')
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('ignores custom hooks', () => {
    const messages = verify({
      code: `
        const useThing = () => {
          return 'hello'
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('ignores component declarations', () => {
    const messages = verify({
      code: `
        const MyComponent = () => {
          return '<div />'
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not run outside component and route file paths', () => {
    const messages = verify({
      filename: 'src/libs/helpers.ts',
      code: `
        const getLabel = () => {
          return 'hello'
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('ignores return values from nested functions', () => {
    const messages = verify({
      code: `
        const handleClick = () => {
          function inner() {
            return 'hello'
          }

          inner()
        }
      `,
    })

    expect(messages).toHaveLength(0)
  })

  it('does not need a useCallback when not returning a value and wrapped', () => {
    const messages = verify({
      code: `
        const getLabel = useCallback(() => {
          console.log('hello')
        })
      `,
    })

    expect(messages).toHaveLength(0)
  })
})
