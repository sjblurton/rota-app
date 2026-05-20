import { describe, expect, it } from 'vitest'
import { getInitials } from './getInitials'

describe('getInitials', () => {
  it.each([
    ['returns the first two initials from a full name', 'John Doe', 'JD'],
    ['trims surrounding whitespace and ignores repeated spaces', '  John   Doe  ', 'JD'],
    ['handles mixed whitespace between words', 'John\tPeter\nDoe', 'JPD'],
    ['handles single-letter words', 'A B', 'AB'],
    ['treats hyphenated first names as one word', 'Jean-Luc Picard', 'JP'],
    [
      'treats multiple hyphens within words as part of the same word',
      'Jean-Luc Picard-Smith',
      'JP',
    ],
    ['treats mixed separators using whitespace words only', 'Mary Jane-Watson', 'MJ'],
    ['treats apostrophes as part of the same word', "John Peter O'connor", 'JPO'],
    ['treats curly apostrophes as part of the same word', 'John Peter O’connor', 'JPO'],
    ['preserves initials for non-Latin scripts', '李 小龙', '李小'],
    ['uppercases accented initials', 'Élodie Brontë', 'ÉB'],
    ['keeps emoji when it starts a name part', '😀 Smile Person', '😀SP'],
    ['returns a single initial for a single word', 'John', 'J'],
    ['returns three initials for three words', 'john peter doe', 'JPD'],
    [
      'limits to three initials even if there are more than three words',
      'John Peter Doe Smith',
      'JPS',
    ],
    [
      'uses the first two initials and the last initial for very long names',
      'John Peter Paul George Smith',
      'JPS',
    ],
  ])('%s', (_, input, expected) => {
    expect(getInitials(input)).toBe(expected)
  })

  it('returns null for empty input', () => {
    expect(getInitials('')).toBeNull()
    expect(getInitials('   ')).toBeNull()
  })
})
