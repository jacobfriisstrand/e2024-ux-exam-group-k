const CONFIG = {
  API_BASE_URL: "http://localhost:8888",
  ENDPOINTS: {
    BOOKS: "/books",
    AUTHORS: "/authors",
    PUBLISHERS: "/publishers",
    USERS: "/users",
    ADMIN: "/admin",
  },
  STORAGE_KEYS: {
    // TODO: change the key to be the email
    USER_ID: "user_id",
    IS_ADMIN: "is_admin",
  },
  SIMULATE_ERROR: false,
};

export default CONFIG;
