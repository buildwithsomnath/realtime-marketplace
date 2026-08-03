import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Search from "../pages/Search";
import ItemDetails from "../pages/ItemDetails";
import NotFound from "../pages/NotFound";

// Protected Pages
import Dashboard from "../pages/Dashboard";
import MyItems from "../pages/MyItems";
import Profile from "../pages/Profile";
import Conversations from "../pages/Conversations";
import Chat from "../pages/Chat";
import CreateItem from "../pages/CreateItem";
import EditItem from "../pages/EditItem";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/signup" element={<Signup />} />

                <Route path="/items" element={<Search />} />

                <Route
                    path="/items/:id"
                    element={<ItemDetails />}
                />

            </Route>

            {/* Protected Routes */}
            <Route
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/dashboard/items"
                    element={<MyItems />}
                />

                <Route
                    path="/dashboard/items/create"
                    element={<CreateItem />}
                />

                <Route
                    path="/dashboard/items/:id/edit"
                    element={<EditItem />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/conversations"
                    element={<Conversations />}
                />

                <Route
                    path="/conversations/:id"
                    element={<Chat />}
                />

            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

        </Routes>
    );
};

export default AppRoutes;