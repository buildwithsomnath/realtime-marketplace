import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import NotificationDropdown from "./NotificationDropdown";
import UserMenu from "./UserMenu";

const Navbar = () => {
    const loggedIn = !!localStorage.getItem("access");

    return (
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                <Link
                    to="/"
                    className="text-2xl font-bold text-indigo-600"
                >
                    Marketplace
                </Link>

                <SearchBar />

                {!loggedIn ? (
                    <div className="flex gap-4">

                        <Link
                            to="/login"
                            className="rounded-lg px-4 py-2 hover:bg-gray-100"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                        >
                            Sign Up
                        </Link>

                    </div>
                ) : (
                    <div className="flex items-center gap-4">

                        <Link
                            to="/dashboard/items/create"
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
                        >
                            Sell Item
                        </Link>

                        <NotificationDropdown />

                        <UserMenu />

                    </div>
                )}

            </div>

        </header>
    );
};

export default Navbar;