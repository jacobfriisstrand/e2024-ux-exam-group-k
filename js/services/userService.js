import CONFIG from "../utils/config.js";

// Login user
async function login(email, password) {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);

  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.USERS + "/login", {
    method: "POST",
    body: data,
  });

  const result = await response.json();

  if (result.user_id) {
    // Get full user profile
    const userProfile = await getUserProfile(result.user_id);

    // Store user info
    sessionStorage.setItem("user_id", result.user_id);
    sessionStorage.setItem("user_email", userProfile.email);
    if (userProfile.email === "admin.library@mail.com") {
      sessionStorage.setItem("is_admin", "true");
    }
  }

  return result;
}

// Sign up new user
async function signup(userData) {
  const data = new FormData();
  for (let key in userData) {
    data.append(key, userData[key]);
  }

  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.USERS, {
    method: "POST",
    body: data,
  });
  const result = await response.json();

  if (result.user_id) {
    // Get full user profile
    const userProfile = await getUserProfile(result.user_id);

    // Store user info
    sessionStorage.setItem("user_id", result.user_id);
    sessionStorage.setItem("user_email", userProfile.email);
    if (userProfile.email === "admin.library@mail.com") {
      sessionStorage.setItem("is_admin", "true");
    }
  }

  return result;
}

// Get user profile
async function getUserProfile(userId) {
  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.USERS + "/" + userId);
  return await response.json();
}

// Update user profile
async function updateUserProfile(userId, userData) {
  const data = new FormData();
  for (let key in userData) {
    data.append(key, userData[key]);
  }

  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.USERS + "/" + userId, {
    method: "PUT",
    body: data,
  });
  return await response.json();
}

// Delete user account
async function deleteAccount(userId) {
  const response = await fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.USERS + "/" + userId, {
    method: "DELETE",
  });
  return await response.json();
}

// Logout user
function logout() {
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("user_email");
  sessionStorage.removeItem("is_admin");
}

export { login, signup, getUserProfile, updateUserProfile, deleteAccount, logout };
