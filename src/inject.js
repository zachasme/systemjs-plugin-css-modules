// keep track of injected styles
const injects = {}

/**
 * Inject css source string into document
 */
export function inject(file, css) {
  if (false === file in injects) {
    const element = document.createElement('style')
    document.head.appendChild(element)
    injects[file] = element
  }
  injects[file].innerHTML = css
}

// used for bundled output
export const INJECT_FUNCTION_STRING = `
(function(c){
  if (typeof document == 'undefined') return;
  var d=document,
      a='appendChild',
      i='styleSheet',
      s=d.createElement('style');
      s.type='text/css';
      d.getElementsByTagName('head')[0][a](s);
  s[i]?s[i].cssText=c:s[a](d.createTextNode(c));
})`
