import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
    const {
        authenticated,
        loading,
    } = useAuth();

    if (loading) {
        return (
            <div className="page-loading">
                Loading...
            </div>
        );
    }

    if (!authenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;