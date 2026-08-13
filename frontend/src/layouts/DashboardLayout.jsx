import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/dashboard-layout.css";

const DashboardLayout = () => {
    return (
        <div className="dashboard-layout">

            <Navbar />

            <div className="dashboard-layout-body">

                <Sidebar />

                <main className="dashboard-main">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;