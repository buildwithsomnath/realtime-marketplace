import {
    createContext,
    useEffect,
    useState,
} from "react";

import {
    login as loginAPI,
    signup as signupAPI,
    logout as logoutAPI,
    getProfile,
} from "../api/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [authenticated, setAuthenticated] = useState(
        Boolean(localStorage.getItem("access"))
    );

    const loadUser = async () => {
        try {
            const response = await getProfile();

            setUser(response.data);
            setAuthenticated(true);
        } catch (error) {
            console.error("Failed to load profile:", error);

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setUser(null);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        const response = await loginAPI(credentials);

        localStorage.setItem(
            "access",
            response.data.access
        );

        if (response.data.refresh) {
            localStorage.setItem(
                "refresh",
                response.data.refresh
            );
        }

        await loadUser();

        return response.data;
    };

    const signup = async (data) => {
        return signupAPI(data);
    };

    const logout = async () => {
        try {
            const refresh =
                localStorage.getItem("refresh");

            if (refresh) {
                await logoutAPI(refresh);
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            setUser(null);
            setAuthenticated(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access");

        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                authenticated,
                login,
                signup,
                logout,
                loadUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};