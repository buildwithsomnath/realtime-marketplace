import api from "./axios";

export const signup = (data) => {
    return api.post("auth/signup/", data);
};

export const login = (data) => {
    return api.post("auth/login/", data);
};

export const refreshToken = (refresh) => {
    return api.post("auth/refresh/", {
        refresh,
    });
};

export const logout = (refresh) => {
    return api.post("auth/logout/", {
        refresh,
    });
};

export const getProfile = () => {
    return api.get("auth/profile/");
};

export const updateProfile = (data) => {
    return api.put("auth/profile/", data);
};

export const patchProfile = (data) => {
    return api.patch("auth/profile/", data);
};

export const deleteProfile = () => {
    return api.delete("auth/profile/");
};