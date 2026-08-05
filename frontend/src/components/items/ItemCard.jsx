import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    HeartIcon,
    MapPinIcon,
    EyeIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

const ItemCard = ({ item }) => {
    return (
        <motion.div
            whileHover={{
                y: -8,
            }}
            transition={{
                duration: 0.25,
            }}
            className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl"
        >
            {/* Image */}

            <div className="relative">

                <img
                    src={
                        item.image ||
                        "https://placehold.co/600x400?text=Marketplace"
                    }
                    alt={item.name}
                    className="h-60 w-full object-cover transition duration-500 hover:scale-110"
                />

                {/* Wishlist */}

                <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow">

                    <HeartIcon className="h-6 w-6 text-gray-600 hover:text-red-500" />

                </button>

                {/* Status */}

                <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white ${
                        item.is_sold
                            ? "bg-red-500"
                            : "bg-green-500"
                    }`}
                >
                    {item.is_sold ? "Sold" : "Available"}
                </span>

            </div>

            {/* Body */}

            <div className="space-y-3 p-5">

                {/* Category */}

                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {item.category_name || "Category"}
                </span>

                {/* Name */}

                <h2 className="line-clamp-1 text-xl font-bold">
                    {item.name}
                </h2>

                {/* Description */}

                <p className="line-clamp-2 text-sm text-gray-500">
                    {item.description}
                </p>

                {/* Price */}

                <div className="text-3xl font-bold text-indigo-600">
                    ₹{item.price}
                </div>

                {/* Seller */}

                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <UserCircleIcon className="h-8 w-8 text-gray-400" />

                        <span className="text-sm text-gray-600">
                            {item.created_by}
                        </span>

                    </div>

                    <div className="flex items-center gap-1 text-sm text-gray-500">

                        <MapPinIcon className="h-4 w-4" />

                        India

                    </div>

                </div>

                {/* Buttons */}

                <div className="flex gap-3 pt-2">

                    <Link
                        to={`/items/${item.id}`}
                        className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
                    >
                        View Details
                    </Link>

                    <button className="rounded-xl border border-gray-300 px-4 hover:bg-gray-100">

                        <EyeIcon className="h-6 w-6" />

                    </button>

                </div>

            </div>

        </motion.div>
    );
};

export default ItemCard;