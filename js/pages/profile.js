/* 
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
  */
import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";
import { getUserProfile, updateUserProfile } from "../services/userService.js";
import { deleteAccount } from "../services/userService.js";

async function loadUserProfile() {
  const profileForm = document.getElementById("profileForm");
  const userFirstNamePlaceholder = document.getElementById("userFirstNamePlaceholder");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const addressInput = document.getElementById("address");
  const birthDateInput = document.getElementById("birthDate");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const membershipDatePlaceholder = document.getElementById("membershipDatePlaceholder");
  const userFirstNameDisplay = document.querySelector("header h1 span"); // Reference to the <span> inside <h1>

  try {
    // Retrieve user ID from sessionStorage
    const userId = sessionStorage.getItem("user_id");

    if (!userId) {
      throw new Error("User is not logged in");
    }

    // Fetch user profile data
    const userData = await getUserProfile(userId);

    // Populate the form fields with user data
    if (userFirstNamePlaceholder) userFirstNamePlaceholder.textContent = userData.first_name;
    if (firstNameInput) firstNameInput.value = userData.first_name;
    if (lastNameInput) lastNameInput.value = userData.last_name;
    if (addressInput) addressInput.value = userData.address;
    if (birthDateInput) birthDateInput.value = userData.birth_date;
    if (phoneInput) phoneInput.value = userData.phone_number;
    if (emailInput) emailInput.value = userData.email;

    // Display membership date
    if (membershipDatePlaceholder) {
      membershipDatePlaceholder.textContent = userData.membership_date ? new Date(userData.membership_date).toLocaleDateString() : "N/A";
    }

    // Handle the form submission
    profileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const updatedUserData = {
        first_name: firstNameInput.value,
        last_name: lastNameInput.value,
        address: addressInput.value,
        birth_date: birthDateInput.value,
        phone_number: phoneInput.value,
        email: emailInput.value,
      };

      try {
        const updateResponse = await updateUserProfile(userId, updatedUserData);
        console.log("Update Response:", updateResponse);

        if (updateResponse.status === "ok") {
          // Update the <h1> with the new first name after profile update
          if (userFirstNameDisplay) {
            userFirstNameDisplay.textContent = updatedUserData.first_name;
          }

        } else {
          throw new Error("Failed to update profile");
        }
      } catch (updateError) {
        console.error("Error updating profile:", updateError);
        const errorDisplay = createErrorDisplay(ERROR_MESSAGES.UPDATE, loadUserProfile);
        profileForm.innerHTML = ""; // Clear the form for error display
        profileForm.appendChild(errorDisplay);
      }
    });
  } catch (error) {
    console.error("Error loading user profile:", error);
    const errorDisplay = createErrorDisplay(ERROR_MESSAGES.FETCH, loadUserProfile);
    profileForm.innerHTML = "";
    profileForm.appendChild(errorDisplay);
  }
}

const deleteButton = document.getElementById("delete-profile");
const userId = sessionStorage.getItem("user_id");

deleteButton.addEventListener("click", async (e) => {
  try {
    const success = await deleteAccount(userId);
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("user_email");
    console.log("User deleted")
    if (success) {
      window.location.href = "/index.html"; // Redirect to /signup.html
    }
  } catch (error) {
    console.error("Error deleting account:", error); // Handle errors
  }
});


document.addEventListener("DOMContentLoaded", loadUserProfile);
