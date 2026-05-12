/**
 * Merged dependencies configuration for client ESLint boundaries.
 *
 * Imports all layer-specific dependency rules and exports as a single array
 * for use in the main ESLint configuration.
 */

import { appDependencies } from './dependencies-app.mjs'
import { routesRootDependencies, routesDependencies } from './dependencies-routes.mjs'
import {
  componentsSingletonDependencies,
  componentsDependencies,
} from './dependencies-components.mjs'
import { hooksDependencies } from './dependencies-hooks.mjs'
import { integrationsDependencies } from './dependencies-integrations.mjs'
import { libsDependencies } from './dependencies-libs.mjs'
import { playwrightDependencies } from './dependencies-playwright.mjs'
import { routesRootTestsDependencies } from './dependencies-routes-root-tests.mjs'

export const getDependencies = () => [
  appDependencies,
  routesRootDependencies,
  routesRootTestsDependencies,
  routesDependencies,
  componentsSingletonDependencies,
  componentsDependencies,
  hooksDependencies,
  integrationsDependencies,
  libsDependencies,
  playwrightDependencies,
]
