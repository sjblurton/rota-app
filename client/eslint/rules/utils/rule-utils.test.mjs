import { Linter } from 'eslint'
import { describe, expect, it } from 'vitest'

import { CALLBACK_HOOK_NAMES } from './callback-hook-names.mjs'
import { getFunctionInfoFromVariableDeclarator } from './get-function-info-from-variable-declarator.mjs'
import { getWrapperCalleeName } from './get-wrapper-callee-name.mjs'
import { hasValueReturn } from './has-value-return.mjs'
import { isTargetFile } from './is-target-file.mjs'

function captureFirstVariableDeclarator(code) {
  let capturedNode = null
  let capturedSourceCode = null

  const linter = new Linter()
  linter.defineRule('capture-node', {
    create(context) {
      return {
        VariableDeclarator(node) {
          if (!capturedNode) {
            capturedNode = node
            capturedSourceCode = context.sourceCode
          }
        },
      }
    },
  })

  linter.verify(
    code,
    {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'capture-node': 'error',
      },
    },
    { filename: 'src/components/Test.tsx' },
  )

  return { node: capturedNode, sourceCode: capturedSourceCode }
}

describe('isTargetFile', () => {
  it('matches component and route files', () => {
    expect(isTargetFile('src/components/Button.tsx')).toBe(true)
    expect(isTargetFile('src/routes/home/index.tsx')).toBe(true)
  })

  it('does not match non-target files', () => {
    expect(isTargetFile('src/libs/helpers.ts')).toBe(false)
  })
})

describe('getFunctionInfoFromVariableDeclarator', () => {
  it('returns info for direct function initialiser', () => {
    const { node } = captureFirstVariableDeclarator("const getLabel = () => 'hello'")
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    expect(info?.variableName).toBe('getLabel')
    expect(info?.functionNode.type).toBe('ArrowFunctionExpression')
  })

  it('returns info for wrapped function initialiser', () => {
    const { node } = captureFirstVariableDeclarator(
      "const getLabel = useCallback(() => 'hello', [])",
    )
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    expect(info?.variableName).toBe('getLabel')
    expect(info?.functionNode.type).toBe('ArrowFunctionExpression')
  })

  it('ignores custom hooks and component names', () => {
    const { node: hookNode } = captureFirstVariableDeclarator("const useThing = () => 'x'")
    const { node: componentNode } = captureFirstVariableDeclarator("const Thing = () => 'x'")

    expect(
      getFunctionInfoFromVariableDeclarator(hookNode, {
        wrappedCalleeNames: CALLBACK_HOOK_NAMES,
      }),
    ).toBeNull()
    expect(
      getFunctionInfoFromVariableDeclarator(componentNode, {
        wrappedCalleeNames: CALLBACK_HOOK_NAMES,
      }),
    ).toBeNull()
  })
})

describe('getWrapperCalleeName', () => {
  it('returns wrapper hook name for wrapped function', () => {
    const { node, sourceCode } = captureFirstVariableDeclarator(
      "const getLabel = useEventCallback(() => 'hello')",
    )
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    const wrapperName = getWrapperCalleeName(info?.functionNode, sourceCode, CALLBACK_HOOK_NAMES)

    expect(wrapperName).toBe('useEventCallback')
  })

  it('returns null when function has no allowed wrapper', () => {
    const { node, sourceCode } = captureFirstVariableDeclarator("const getLabel = () => 'hello'")
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    const wrapperName = getWrapperCalleeName(info?.functionNode, sourceCode, CALLBACK_HOOK_NAMES)

    expect(wrapperName).toBeNull()
  })
})

describe('hasValueReturn', () => {
  it('returns true for concise value-returning arrow function', () => {
    const { node } = captureFirstVariableDeclarator("const getLabel = () => 'hello'")
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    expect(hasValueReturn(info?.functionNode)).toBe(true)
  })

  it('returns false for function without value return', () => {
    const { node } = captureFirstVariableDeclarator(
      "const handleClick = () => { console.log('hello') }",
    )
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    expect(hasValueReturn(info?.functionNode)).toBe(false)
  })

  it('ignores nested function return values', () => {
    const { node } = captureFirstVariableDeclarator(`
      const handleClick = () => {
        function inner() {
          return 'hello'
        }
        inner()
      }
    `)
    const info = getFunctionInfoFromVariableDeclarator(node, {
      wrappedCalleeNames: CALLBACK_HOOK_NAMES,
    })

    expect(hasValueReturn(info?.functionNode)).toBe(false)
  })
})
