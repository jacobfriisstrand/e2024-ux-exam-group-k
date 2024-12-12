/**
 * Creates and displays a popover message using native popover elements.
 */
export function createPopover() {
    // Get the active element as the target
    const targetElement = document.activeElement;

    // Ensure the target element has the necessary data attributes
    if (!targetElement || !targetElement.dataset.message || !targetElement.dataset.type) {
        console.error("Target element is invalid or missing required data attributes.");
        return;
    }

    // Extract the message and type from data attributes
    const message = targetElement.dataset.message;
    const type = targetElement.dataset.type;

    // Create the popover content
    const popoverContent = document.createElement("div");
    popoverContent.id = `${targetElement.id || "popover"}-content`;
    popoverContent.setAttribute("popover", "");
    popoverContent.innerText = message;

    // Style the popover using CSS classes
    popoverContent.className = `popover popover-${type}`;

    // Append the popover to the target element
    targetElement.insertAdjacentElement("afterend", popoverContent);

    // Associate the target button with the popover
    targetElement.setAttribute("popovertarget", popoverContent.id);
}
