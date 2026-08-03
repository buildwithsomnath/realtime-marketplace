import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ItemsPage from "../pages/ItemsPage";
import ItemDetailPage from "../pages/ItemDetailPage";

// Dashboard Pages
import DashboardPage from "../pages/dashboard/DashboardPage";
import MyItemsPage from "../pages/dashboard/MyItemsPage";
import ProfilePage from "../pages/dashboard/ProfilePage";
import ConversationPage from "../pages/dashboard/ConversationPage";
import CreateItemPage from "../pages/dashboard/CreateItemPage";

const AppRoutes = () => {
    return (
        <Routes>

            {/* ---------------- Public Routes ---------------- */}

            <Route element={<MainLayout />}>

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/signup"
                    element={<SignupPage />}
                />

                <Route
                    path="/items"
                    element={<ItemsPage />}
                />

                <Route
                    path="/items/:id"
                    element={<ItemDetailPage />}
                />

            </Route>

            {/* ---------------- Protected Routes ---------------- */}

            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/dashboard/items"
                    element={<MyItemsPage />}
                />

                <Route
                    path="/dashboard/items/create"
                    element={<CreateItemPage />}
                />

                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />

                <Route
                    path="/conversations"
                    element={<ConversationPage />}
                />

            </Route>

            {/* ---------------- 404 ---------------- */}

            <Route
                path="*"
                element={
                    <div className="flex h-screen items-center justify-center">
                        <h1 className="text-3xl font-bold">
                            404 | Page Not Found
                        </h1>
                    </div>
                }
            />

        </Routes>
    );
};

export default AppRoutes;