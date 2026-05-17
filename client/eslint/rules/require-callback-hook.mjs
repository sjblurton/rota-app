import { CALLBACK_HOOK_NAMES } from './utils/callback-hook-names.mjs'
import { getFunctionInfoFromVariableDeclarator } from './utils/get-function-info-from-variable-declarator.mjs'
import { getWrapperCalleeName } from './utils/get-wrapper-callee-name.mjs'
import { hasValueReturn } from './utils/has-value-return.mjs'
import { isTargetFile } from './utils/is-target-file.mjs'

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Suggest wrapping value-returning functions in React components with useCallback',
      category: 'React',
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const filename = context.filename
    if (!isTargetFile(filename)) {
      return {}
    }

    return {
      VariableDeclarator(node) {
        const functionInfo = getFunctionInfoFromVariableDeclarator(node, {
          wrappedCalleeNames: CALLBACK_HOOK_NAMES,
        })
        if (!functionInfo) {
          return
        }

        const { functionNode, variableName } = functionInfo
        if (!hasValueReturn(functionNode)) {
          return
        }

        const wrapperHookName = getWrapperCalleeName(
          functionNode,
          context.sourceCode,
          CALLBACK_HOOK_NAMES,
        )
        if (wrapperHookName === 'useCallback') {
          return
        }

        context.report({
          node: functionNode,
          message: `Function '${variableName}' should be wrapped in useCallback`,
        })
      },
    }
  },
}
