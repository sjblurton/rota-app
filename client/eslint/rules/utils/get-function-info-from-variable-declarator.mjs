function isFunctionNode(node) {
  return node.type === 'ArrowFunctionExpression' || node.type === 'FunctionExpression'
}

export function getFunctionInfoFromVariableDeclarator(node, options = {}) {
  const { wrappedCalleeNames = [] } = options

  if (!node.init || node.id.type !== 'Identifier') {
    return null
  }

  const init = node.init
  const variableName = node.id.name

  if (/^[A-Z]/.test(variableName) || /^use[A-Z]/.test(variableName)) {
    return null
  }

  if (isFunctionNode(init)) {
    return { functionNode: init, variableName }
  }

  if (
    init.type === 'CallExpression' &&
    init.callee.type === 'Identifier' &&
    wrappedCalleeNames.includes(init.callee.name)
  ) {
    const callbackArgument = init.arguments[0]
    if (callbackArgument && isFunctionNode(callbackArgument)) {
      return { functionNode: callbackArgument, variableName }
    }
  }

  return null
}
