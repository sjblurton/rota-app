import { CALLBACK_HOOK_NAMES } from './utils/callback-hook-names.mjs'
import { getFunctionInfoFromVariableDeclarator } from './utils/get-function-info-from-variable-declarator.mjs'
import { getWrapperCalleeName } from './utils/get-wrapper-callee-name.mjs'
import { hasValueReturn } from './utils/has-value-return.mjs'
import { isTargetFile } from './utils/is-target-file.mjs'

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce that void-returning functions in React components are wrapped in useEventCallback',
      category: 'Best Practices',
    },
  },
  create(context) {
    const filename = context.filename

    return {
      VariableDeclarator(node) {
        if (!isTargetFile(filename)) {
          return
        }

        const functionInfo = getFunctionInfoFromVariableDeclarator(node, {
          wrappedCalleeNames: CALLBACK_HOOK_NAMES,
        })

        if (!functionInfo) {
          return
        }

        const { functionNode, variableName } = functionInfo

        if (hasValueReturn(functionNode)) {
          return
        }

        const wrapperName = getWrapperCalleeName(
          functionNode,
          context.sourceCode,
          CALLBACK_HOOK_NAMES,
        )

        if (wrapperName === 'useEventCallback') {
          return
        }

        context.report({
          node,
          message: `Function '${variableName}' should be wrapped in useEventCallback`,
        })
      },
    }
  },
}
