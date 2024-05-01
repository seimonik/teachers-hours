export function toggleVisibility(elementId: string, isVisible: boolean) {
  const element = document.getElementById(elementId);

  if (element) {
    if (isVisible) {
      element.style.display = "visible";
    } else {
      element.style.display = "none";
    }
  }
}
