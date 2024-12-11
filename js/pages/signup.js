// Import the userService functions
import { signup, login, getUserProfile } from "../services/userService.js";

// Get form elements
const signupForm = document.getElementById("signupForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const birthDate = document.getElementById("birthDate");

// Get error elements
const errors = {
  email: document.getElementById("emailError"),
  password: document.getElementById("passwordError"),
  confirmPassword: document.getElementById("confirmPasswordError"),
  firstName: document.getElementById("firstNameError"),
  lastName: document.getElementById("lastNameError"),
  address: document.getElementById("addressError"),
  phone: document.getElementById("phoneError"),
  birthDate: document.getElementById("birthDateError"),
};

// Validation patterns
const patterns = {
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  phone: /^\d+$/,
  name: /^[\p{L}\p{M}\p{Pd}.'’\s]+$/u,
};

// Handle form submission
signupForm.onsubmit = async function (e) {
  e.preventDefault();
  clearErrors();

  // Validate inputs
  if (!validateForm()) {
    return;
  }

  try {
    // Create user data object
    const userData = {
      email: email.value.trim(),
      password: password.value,
      first_name: firstName.value.trim(),
      last_name: lastName.value.trim(),
      address: address.value.trim(),
      phone_number: phone.value.trim(),
      birth_date: birthDate.value,
    };

    // Use signup function
    const result = await signup(userData);

    if (result.user_id) {
      // Log in automatically
      await loginAfterSignup();
    } else {
      showError(errors.email, "Registration failed");
    }
  } catch (error) {
    console.error("Signup error:", error);
    if (error.message.includes("already exists")) {
      showError(errors.email, "This email is already registered");
    } else {
      showError(errors.email, "Registration failed. Please try again.");
    }
  }
};

// Validate form inputs
function validateForm() {
  let isValid = true;

  // Validate email
  if (!email.value.trim()) {
    showError(errors.email, "Email is required");
    isValid = false;
  } else if (!patterns.email.test(email.value.trim())) {
    showError(errors.email, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!password.value) {
    showError(errors.password, "Password is required");
    isValid = false;
  } else if (!patterns.password.test(password.value)) {
    showError(errors.password, "Password must be at least 8 characters with uppercase, lowercase, number and special character");
    isValid = false;
  }

  // Validate password match
  if (password.value !== confirmPassword.value) {
    showError(errors.confirmPassword, "Passwords do not match");
    isValid = false;
  }

  // Validate names
  if (!patterns.name.test(firstName.value.trim())) {
    showError(errors.firstName, "Please enter a valid first name");
    isValid = false;
  }
  if (!patterns.name.test(lastName.value.trim())) {
    showError(errors.lastName, "Please enter a valid last name");
    isValid = false;
  }

  // Validate phone
  if (!patterns.phone.test(phone.value.trim())) {
    showError(errors.phone, "Please enter a valid phone number");
    isValid = false;
  }

  // Validate address
  if (!address.value.trim()) {
    showError(errors.address, "Address is required");
    isValid = false;
  }

  // Validate birth date
  if (!birthDate.value) {
    showError(errors.birthDate, "Birth date is required");
    isValid = false;
  } else {
    // Check age (must be at least 13)
    const age = calculateAge(new Date(birthDate.value));
    if (age < 13) {
      showError(errors.birthDate, "You must be at least 13 years old to register");
      isValid = false;
    }
  }

  return isValid;
}

// Calculate age from birth date
function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

// Log in user after successful signup
async function loginAfterSignup() {
  try {
    // Use login function
    const result = await login(email.value.trim(), password.value);

    const userProfile = await getUserProfile(result.user_id);

    if (result.user_id) {
      sessionStorage.setItem("user_id", result.user_id);
      sessionStorage.setItem("user_email", userProfile.email);
      window.location.href = "index.html";
    } else {
      throw new Error("Auto-login failed");
    }
  } catch (error) {
    console.error("Auto-login error:", error);
    showError(errors.email, "Account created but login failed. Please try logging in manually.");
  }
}

// Clear error messages
function clearErrors() {
  Object.values(errors).forEach((element) => {
    element.textContent = "";
  });
}

// Show error message
function showError(element, message) {
  element.textContent = message;
}
