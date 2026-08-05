import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.03,
            }}
            transition={{ duration: 0.2 }}
        >
            <Link
                to={`/items?category=${category.id}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-indigo-500 hover:shadow-xl"
            >
                <div className="mb-4 rounded-full bg-indigo-100 p-5 transition group-hover:bg-indigo-600">
                    <span className="text-4xl transition group-hover:scale-110">
                        {category.icon}
                    </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                </h3>

                <p className="mt-2 text-center text-sm text-gray-500">
                    {category.items} Products
                </p>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;