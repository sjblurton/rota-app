export function getWrapperCalleeName(node, sourceCode, allowedCalleeNames = []) {
  if (sourceCode && typeof sourceCode.getAncestors === 'function') {
    const ancestors = sourceCode.getAncestors(node)

    for (let index = ancestors.length - 1; index >= 0; index -= 1) {
      const ancestor = ancestors[index]
      if (
        ancestor.type === 'CallExpression' &&
        ancestor.callee.type === 'Identifier' &&
        allowedCalleeNames.includes(ancestor.callee.name)
      ) {
        return ancestor.callee.name
      }
    }
  }

  let parent = node.parent
  while (parent) {
    if (
      parent.type === 'CallExpression' &&
      parent.callee.type === 'Identifier' &&
      allowedCalleeNames.includes(parent.callee.name)
    ) {
      return parent.callee.name
    }

    parent = parent.parent
  }

  return null
}
