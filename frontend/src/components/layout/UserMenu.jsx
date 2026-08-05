import { Link } from "react-router-dom";

const UserMenu = () => {
    return (
        <div className="relative group">

            <button className="flex items-center gap-2">

                <img
                    src="https://ui-avatars.com/api/?name=User"
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                />

            </button>

            <div className="invisible absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-xl opacity-0 transition group-hover:visible group-hover:opacity-100">

                <Link
                    to="/profile"
                    className="block px-4 py-3 hover:bg-gray-100"
                >
                    Profile
                </Link>

                <Link
                    to="/dashboard"
                    className="block px-4 py-3 hover:bg-gray-100"
                >
                    Dashboard
                </Link>

                <Link
                    to="/dashboard/items"
                    className="block px-4 py-3 hover:bg-gray-100"
                >
                    My Items
                </Link>

                <button
                    className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50"
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default UserMenu;