import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";

async function loadUserProfile() {
  const profileContainer = document.querySelector(".profile-container");

  try {
    const userData = await getUserProfile();
    // Render profile...
  } catch (error) {
    const errorDisplay = createErrorDisplay(ERROR_MESSAGES.FETCH, loadUserProfile);
    profileContainer.innerHTML = "";
    profileContainer.appendChild(errorDisplay);
  }
}
