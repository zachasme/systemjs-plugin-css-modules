/**
 * Inject css source string into document
 */
export default function inject(css) {
  const element = document.createElement('style')
  element.innerHTML = css
  document.head.appendChild(element)
}
