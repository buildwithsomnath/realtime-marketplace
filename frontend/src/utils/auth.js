// src/utils/auth.js

// Access Token
export const getAccessToken = () => {
    return localStorage.getItem("access");
};

export const setAccessToken = (token) => {
    localStorage.setItem("access", token);
};

export const removeAccessToken = () => {
    localStorage.removeItem("access");
};

// Refresh Token
export const getRefreshToken = () => {
    return localStorage.getItem("refresh");
};

export const setRefreshToken = (token) => {
    localStorage.setItem("refresh", token);
};

export const removeRefreshToken = () => {
    localStorage.removeItem("refresh");
};

// User Authentication
export const isAuthenticated = () => {
    return !!getAccessToken();
};

// Logout
export const clearTokens = () => {
    removeAccessToken();
    removeRefreshToken();
};