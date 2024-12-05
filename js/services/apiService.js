import CONFIG from "../utils/config.js";

// Basic fetch with error handling
async function fetchWithError(url, options = {}) {
  try {
    const response = await fetch(CONFIG.API_BASE_URL + url, options);

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// GET request with optional query params
async function get(endpoint, params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = queryString ? `${endpoint}?${queryString}` : endpoint;
  return fetchWithError(url);
}

// POST request
async function post(url, data) {
  const options = {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
  };

  return fetchWithError(url, options);
}

export { get, post };
