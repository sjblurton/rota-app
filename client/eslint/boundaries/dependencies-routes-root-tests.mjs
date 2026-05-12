import { ELEMENT_TYPES } from './constants.mjs'

export const routesRootTestsDependencies = {
  from: { type: ELEMENT_TYPES.ROUTES_ROOT_TESTS },
  allow: [
    { to: { type: ELEMENT_TYPES.ROUTES_ROOT_TESTS } },
    { to: { type: ELEMENT_TYPES.PLAYWRIGHT } },
  ],
}
