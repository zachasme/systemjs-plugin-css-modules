/**
 * Inject css source string into document
 */
export default function inject(css) {
  if (typeof window != 'undefined') return
  const element = document.createElement('style')
  element.innerHTML = css
  document.head.appendChild(element)
}
