import { motion } from "framer-motion";
import CategoryCard from "./CategoryCard";

const categories = [
    {
        id: 1,
        name: "Electronics",
        icon: "💻",
        items: 210,
    },
    {
        id: 2,
        name: "Mobiles",
        icon: "📱",
        items: 180,
    },
    {
        id: 3,
        name: "Fashion",
        icon: "👕",
        items: 155,
    },
    {
        id: 4,
        name: "Furniture",
        icon: "🛋️",
        items: 70,
    },
    {
        id: 5,
        name: "Books",
        icon: "📚",
        items: 120,
    },
    {
        id: 6,
        name: "Gaming",
        icon: "🎮",
        items: 90,
    },
    {
        id: 7,
        name: "Vehicles",
        icon: "🚗",
        items: 45,
    },
    {
        id: 8,
        name: "Accessories",
        icon: "⌚",
        items: 115,
    },
];

const Categories = () => {
    return (
        <section className="mx-auto max-w-7xl px-6">

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >

                <h2 className="text-center text-4xl font-bold">
                    Browse Categories
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
                    Explore thousands of products across multiple categories.
                </p>

            </motion.div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {categories.map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                    />
                ))}

            </div>

        </section>
    );
};

export default Categories;