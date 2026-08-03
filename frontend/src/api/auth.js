import api from "./axios";

// Signup
export const signup = (data) => {
  return api.post("auth/signup/", data);
};

// Login
export const login = (data) => {
  return api.post("auth/login/", data);
};

// Refresh Token
export const refreshToken = (refresh) => {
  return api.post("auth/refresh/", {
    refresh,
  });
};

// Logout
export const logout = (refresh) => {
  return api.post("auth/logout/", {
    refresh,
  });
};

// Get Profile
export const getProfile = () => {
  return api.get("auth/profile/");
};

// Replace Profile
export const updateProfile = (data) => {
  return api.put("auth/profile/", data);
};

// Partial Update
export const patchProfile = (data) => {
  return api.patch("auth/profile/", data);
};

// Delete Account
export const deleteProfile = () => {
  return api.delete("auth/profile/");
};