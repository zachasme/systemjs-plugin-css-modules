// Something is up with the path from css-modules-loader-core
function fixMessedUpPath(messedUpPath) {
  let path = messedUpPath
  if (messedUpPath.substr(0, 7) === '/http:/') {
    path = 'http://' + messedUpPath.substr(7)
  }
  return path
}

/**
 * Import a stylesheet given path and parent
 *
 * Technically this function should not be necessary and could be replaced by
 *         async (a,b) => (await System.import(a,b)).default
 *
 * However css-modules-loader-core passes some slightly strange arguments.
 */
export default async function smellyFetch(fileWithQuotes, messedUpParent) {
  // there is something wrong with the paths from css-modules-loader-core
  const parent = fixMessedUpPath(messedUpParent)
  // for some reason it also returns the filepath in quotes
  const file = fileWithQuotes.replace(/^["']|["']$/g, '')

  const module = await System.import(file, parent)
  return module.default
}
