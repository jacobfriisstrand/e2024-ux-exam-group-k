import { createErrorDisplay, ERROR_MESSAGES } from "../utils/errorHandling.js";
import { login, getUserProfile } from "../services/userService.js";

// Get form and input elements
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Email regex pattern
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Handle form submission
loginForm.onsubmit = async function (e) {
  e.preventDefault();
  clearErrors();

  // Validate inputs
  if (!validateForm()) {
    return;
  }

  try {
    // Use the userService login function
    const result = await login(email.value.trim(), password.value);

    if (result.user_id) {
      // Get full user profile
      const userProfile = await getUserProfile(result.user_id);

      // Save user info
      sessionStorage.setItem("user_id", result.user_id);
      sessionStorage.setItem("user_email", userProfile.email);
      if (userProfile.email === "admin.library@mail.com") {
        sessionStorage.setItem("is_admin", "true");
      }

      // Go to home page
      window.location.href = "index.html";
    } else {
      showError(passwordError, "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    showError(passwordError, "Login failed. Please try again.");
  }
};

// Validate form inputs
function validateForm() {
  let isValid = true;

  // Validate email
  if (!email.value.trim()) {
    showError(emailError, "Email is required");
    isValid = false;
  } else if (!emailPattern.test(email.value.trim())) {
    showError(emailError, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!password.value) {
    showError(passwordError, "Password is required");
    isValid = false;
  }

  return isValid;
}

// Clear error messages
function clearErrors() {
  emailError.textContent = "";
  passwordError.textContent = "";
}

// Show error message
function showError(element, message) {
  element.textContent = message;
}
