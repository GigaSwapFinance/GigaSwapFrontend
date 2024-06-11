export function scrollToElementById(elementId: string, scrollBehavior: ScrollBehavior = 'smooth') {
  const element = document.getElementById(elementId)

  if (element) {
    element.scrollIntoView({ behavior: scrollBehavior })
  }
}