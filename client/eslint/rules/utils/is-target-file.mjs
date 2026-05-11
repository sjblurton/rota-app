export function isTargetFile(filename) {
  return /src\/(components|routes)\/.*\.(tsx?|jsx?)$/.test(filename)
}
