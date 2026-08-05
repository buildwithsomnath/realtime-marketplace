import { BellIcon } from "@heroicons/react/24/outline";

const notifications = [
    {
        id: 1,
        title: "New message",
        subtitle: "John sent you a message",
    },
    {
        id: 2,
        title: "Product Sold",
        subtitle: "MacBook Pro has been sold.",
    },
];

const NotificationDropdown = () => {
    return (
        <div className="relative group">

            <button className="relative rounded-full p-2 hover:bg-gray-100">

                <BellIcon className="h-6 w-6" />

                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>

            </button>

            <div className="invisible absolute right-0 mt-2 w-80 rounded-xl border bg-white shadow-xl opacity-0 transition-all group-hover:visible group-hover:opacity-100">

                <div className="border-b p-4 font-semibold">
                    Notifications
                </div>

                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="border-b p-4 hover:bg-gray-50"
                    >
                        <h4 className="font-medium">
                            {notification.title}
                        </h4>

                        <p className="text-sm text-gray-500">
                            {notification.subtitle}
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default NotificationDropdown;