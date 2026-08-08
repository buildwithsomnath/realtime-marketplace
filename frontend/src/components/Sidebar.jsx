import { NavLink } from "react-router-dom";

import {
    HomeIcon,
    ShoppingBagIcon,
    PlusCircleIcon,
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import "../styles/sidebar.css";

const Sidebar = () => {
    const navigation = [
        {
            name: "Overview",
            path: "/dashboard",
            icon: HomeIcon,
            end: true,
        },
        {
            name: "My Items",
            path: "/dashboard/items",
            icon: ShoppingBagIcon,
        },
        {
            name: "Add Item",
            path: "/dashboard/items/create",
            icon: PlusCircleIcon,
        },
        {
            name: "Conversations",
            path: "/conversations",
            icon: ChatBubbleLeftRightIcon,
        },
        {
            name: "Profile",
            path: "/profile",
            icon: UserCircleIcon,
        },
    ];

    return (
        <aside className="sidebar">

            {/* Sidebar Header */}
            <div className="sidebar-header">
                <h2 className="sidebar-title">
                    Dashboard
                </h2>

                <p className="sidebar-subtitle">
                    Manage your marketplace
                </p>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">

                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `sidebar-link ${
                                    isActive ? "active" : ""
                                }`
                            }
                        >
                            <Icon className="sidebar-icon" />

                            <span className="sidebar-link-text">
                                {item.name}
                            </span>
                        </NavLink>
                    );
                })}

            </nav>

        </aside>
    );
};

export default Sidebar;