export function hasValueReturn(node) {
  if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
    return true
  }

  let foundValueReturn = false

  function visit(currentNode) {
    if (!currentNode || foundValueReturn) {
      return
    }

    if (currentNode.type === 'ReturnStatement') {
      if (currentNode.argument !== null) {
        foundValueReturn = true
      }
      return
    }

    if (
      currentNode !== node &&
      (currentNode.type === 'FunctionExpression' ||
        currentNode.type === 'ArrowFunctionExpression' ||
        currentNode.type === 'FunctionDeclaration')
    ) {
      return
    }

    for (const key of Object.keys(currentNode)) {
      if (key === 'parent') {
        continue
      }

      const value = currentNode[key]
      if (!value) {
        continue
      }

      if (Array.isArray(value)) {
        for (const child of value) {
          if (child && typeof child.type === 'string') {
            visit(child)
          }
        }
        continue
      }

      if (value && typeof value.type === 'string') {
        visit(value)
      }
    }
  }

  if (node.body.type === 'BlockStatement') {
    visit(node.body)
  }

  return foundValueReturn
}
