const BASE_URL = "https://backstage-041f.onrender.com";

/**
 * A helper function to get the authentication token from localStorage.
 */
const getToken = () => localStorage.getItem("token");

/**
 * A wrapper around the Fetch API to handle requests, authentication, and errors.
 * @param {string} url - The API endpoint to call (e.g., "/api/dashboard").
 * @param {object} options - Configuration for the fetch request (e.g., method, body).
 * @returns {Promise<any>} - The JSON response from the API.
 */
const request = async (url, options = {}) => {
  const token = getToken();

  // If there's no token, we can't make authenticated requests.
  if (!token) {
    // In a real app, you might redirect to a login page here.
    throw new Error("Authentication token not found. Please log in.");
  }

  // Prepare the headers, including the Authorization token.
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  const data = await response.json();

  // If the response is not OK (e.g., 404, 500), throw an error.
  if (!response.ok) {
    // Use the server's error message if available.
    throw new Error(data.message || "An unknown API error occurred.");
  }

  return data;
};

// --- API Service Object ---
// This object provides simple methods for making different types of requests.
const API = {
  get: (url) => request(url),
  post: (url, body) => request(url, { method: "POST", body: JSON.stringify(body) }),
  delete: (url) => request(url, { method: "DELETE" }),
  // You can add put, patch, etc. here as needed.
};

export default API;
