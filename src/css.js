import Core from 'css-modules-loader-core'

import { inject, INJECT_FUNCTION_STRING } from './inject'
import smellyFetch from './smell'

// instantiate module loader
const core = new Core()

// keep track of style files
const loadeds = []

/**
 * Fetch hook override
 */
export async function fetch(load, systemFetch) {
  // fetch css source string using regular system fetch
  const source = await systemFetch(load)

  const trace = '' // ??

  // let css-modules-loader-core do the heavy lifting
  const loaded = await core.load(source, load.address, trace, smellyFetch)
  loadeds.push(loaded.injectableSource)

  // inject stylesheets into document
  if (typeof window !== 'undefined') {
    inject(load.address, loaded.injectableSource)
  }

  // generate string containing a valid esm module exporting class names
  return `export default ${JSON.stringify(loaded.exportTokens)}`
}

/**
 * Bundle hook override
 */
export function bundle(loads, compileOpts, outputOpts) {
  // check build flag
  if (this.buildCSS === false) {
    return '';
  }

  const css = loadeds.join('\n').replace(/[\n]/g, '\\n').replace(/[']/g, "") // " ' \n '"

  return `${INJECT_FUNCTION_STRING}('${css}');`
}
