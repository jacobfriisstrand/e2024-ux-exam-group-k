/**
 * Creates and displays a popover message using native popover elements.
 * Arguments:
 * - message: The message to display in the popover
 * - type: The type of popover ('success' or 'error')
 * - targetElement: Optional target element, defaults to activeElement
 */
export function createPopover(message, type, targetElement = document.activeElement) {
  // Ensure we have a target element
  if (!targetElement) {
    console.error("No target element available for popover");
    return;
  }

  // Create the popover content
  const popoverContent = document.createElement("div");
  popoverContent.id = `${targetElement.id || "popover"}-content`;
  popoverContent.setAttribute("popover", "");
  popoverContent.innerText = message;

  // Style the popover using CSS classes
  popoverContent.className = `popover-open popover-${type}`;

  // Append the popover to the body
  document.body.appendChild(popoverContent);

  // Position in bottom right corner
  popoverContent.style.position = "fixed";
  popoverContent.style.bottom = "var(--sp-32)";
  popoverContent.style.right = "var(--sp-32)";
  popoverContent.style.left = "auto";
  popoverContent.style.top = "auto";

  // Show the popover
  popoverContent.showPopover();

  // Auto-hide after 3 seconds
  setTimeout(() => {
    popoverContent.classList.remove("popover-open");
    popoverContent.hidePopover();
    // Remove the element after hiding
    setTimeout(() => popoverContent.remove(), 300);
  }, 5000);
}
