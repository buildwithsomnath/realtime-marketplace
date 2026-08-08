import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    ShoppingBagIcon,
    MagnifyingGlassIcon,
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import useAuth from "../hooks/useAuth";

import "../styles/navbar.css";

const Navbar = () => {
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            navigate("/", { replace: true });
        }
    };

    return (
        <header className="navbar">

            <div className="container navbar-inner">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand"
                >
                    <span className="navbar-logo">
                        <ShoppingBagIcon />
                    </span>

                    <span>
                        Marketplace
                    </span>
                </Link>


                {/* Navigation */}
                <nav className="navbar-links">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `navbar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/items"
                        className={({ isActive }) =>
                            `navbar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        Browse
                    </NavLink>

                    {authenticated && (
                        <>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `navbar-link ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <NavLink
                                to="/conversations"
                                className={({ isActive }) =>
                                    `navbar-link ${
                                        isActive ? "active" : ""
                                    }`
                                }
                            >
                                Messages
                            </NavLink>
                        </>
                    )}

                </nav>


                {/* Right Actions */}
                <div className="navbar-actions">

                    {!authenticated ? (

                        <>
                            <Link
                                to="/login"
                                className="btn btn-secondary"
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                className="btn btn-primary"
                            >
                                Sign up
                            </Link>
                        </>

                    ) : (

                        <>
                            {/* Search */}
                            <Link
                                to="/items"
                                className="navbar-link"
                                title="Search"
                            >
                                <MagnifyingGlassIcon
                                    style={{
                                        width: 19,
                                        height: 19,
                                    }}
                                />
                            </Link>


                            {/* Messages */}
                            <Link
                                to="/conversations"
                                className="navbar-link"
                                title="Messages"
                            >
                                <ChatBubbleLeftRightIcon
                                    style={{
                                        width: 19,
                                        height: 19,
                                    }}
                                />
                            </Link>


                            {/* Profile */}
                            <Link
                                to="/profile"
                                className="navbar-link"
                                title="Profile"
                            >
                                <UserCircleIcon
                                    style={{
                                        width: 21,
                                        height: 21,
                                    }}
                                />
                            </Link>


                            {/* Logout */}
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>

                    )}

                </div>

            </div>

        </header>
    );
};

export default Navbar;