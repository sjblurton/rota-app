import { globalTypes } from './constants.mjs'

const globalTypesCanImportEachOther = globalTypes.map((type) => ({
  from: { type },
  allow: { to: { type: globalTypes } },
}))

export const golbalImportRules = [...globalTypesCanImportEachOther]
