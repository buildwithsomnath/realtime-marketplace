import {
    HomeIcon,
    Squares2X2Icon,
    ChatBubbleLeftRightIcon,
    UserCircleIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

const menu = [
    {
        title: "Dashboard",
        icon: HomeIcon,
        link: "/dashboard",
    },
    {
        title: "My Items",
        icon: Squares2X2Icon,
        link: "/dashboard/items",
    },
    {
        title: "Create Item",
        icon: PlusCircleIcon,
        link: "/dashboard/items/create",
    },
    {
        title: "Messages",
        icon: ChatBubbleLeftRightIcon,
        link: "/conversations",
    },
    {
        title: "Profile",
        icon: UserCircleIcon,
        link: "/profile",
    },
];

const Sidebar = () => {
    return (
        <aside className="hidden min-h-screen w-72 border-r bg-white lg:block">

            <div className="p-6">

                <h2 className="mb-8 text-xl font-bold">
                    Dashboard
                </h2>

                <nav className="space-y-2">

                    {menu.map((item) => (
                        <NavLink
                            key={item.title}
                            to={item.link}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl p-3 transition ${
                                    isActive
                                        ? "bg-indigo-600 text-white"
                                        : "hover:bg-gray-100"
                                }`
                            }
                        >
                            <item.icon className="h-6 w-6" />

                            {item.title}

                        </NavLink>
                    ))}

                </nav>

            </div>

        </aside>
    );
};

export default Sidebar;