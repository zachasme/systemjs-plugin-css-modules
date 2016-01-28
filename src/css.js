import Core from 'css-modules-loader-core'

import inject from './inject'
import smellyFetch from './smell'

// instantiate module loader
const core = new Core()

/**
 * Fetch hook override
 */
export async function fetch(load, systemFetch) {
  const trace = '' // ??

  // fetch css source string using regular system fetch
  const source = await systemFetch(load)

  // let css-modules-loader-core do the heavy lifting
  const loaded = await core.load(source, load.address, trace, smellyFetch)

  // inject stylesheets into document
  inject(loaded.injectableSource)

  // generate string containing a valid esm module exporting class names
  return `export default ${JSON.stringify(loaded.exportTokens)}`
}
