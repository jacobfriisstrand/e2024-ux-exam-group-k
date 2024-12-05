// Error handling utility functions
export function createErrorDisplay(message, retryCallback = null) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-container";

  errorContainer.innerHTML = `
    <div class="error-content">
      <div class="error-icon">⚠️</div>
      <p class="error-message">${message}</p>
      ${retryCallback ? '<button class="retry-button">Try Again</button>' : ""}
    </div>
  `;

  if (retryCallback) {
    const retryButton = errorContainer.querySelector(".retry-button");
    retryButton.addEventListener("click", retryCallback);
  }

  return errorContainer;
}

export function disableInteractiveElements(elements) {
  elements.forEach((element) => {
    if (element) {
      element.disabled = true;
    }
  });
}

export function enableInteractiveElements(elements) {
  elements.forEach((element) => {
    if (element) {
      element.disabled = false;
    }
  });
}

export const ERROR_MESSAGES = {
  FETCH: "Unable to connect to the library. Please check your internet connection and try again.",
  SEARCH: "Search failed. Please try again later.",
  AUTH: "Authentication failed. Please try logging in again.",
  GENERAL: "Something went wrong. Please try again later.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION: "Please check your input and try again.",
};
