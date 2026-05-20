const getFirstCharacter = (word: string) => Array.from(word)[0]?.toUpperCase() ?? ''

export const getInitials = (string: string): string | null => {
  const words = string.trim().split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return null
  }

  const initials = words.map(getFirstCharacter)

  if (initials.length >= 3) {
    return `${initials[0]}${initials[1]}${initials[initials.length - 1]}`
  }

  return initials.join('')
}
