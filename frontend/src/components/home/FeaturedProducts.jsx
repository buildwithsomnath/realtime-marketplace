import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import ProductGrid from "../items/ProductGrid";

import Spinner from "../ui/Spinner";

import { getItems } from "../../api/items";

const FeaturedProducts = () => {
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await getItems();

            setItems(res.data);
        } catch (err) {
            console.error(err);

            setError("Failed to load products.");
        } finally {
            setLoading(false);
        }
    };

    if (loading)
        return (
            <div className="py-20">
                <Spinner />
            </div>
        );

    if (error)
        return (
            <div className="py-20 text-center text-red-600">
                {error}
            </div>
        );

    return (
        <section className="mx-auto max-w-7xl px-6">

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            >
                <h2 className="text-center text-4xl font-bold">
                    Featured Products
                </h2>

                <p className="mt-3 text-center text-gray-500">
                    Browse the newest products from our marketplace.
                </p>

            </motion.div>

            <div className="mt-12">

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed py-20 text-center">

                        <h2 className="text-2xl font-bold">
                            No Products Yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Be the first seller to list an item.
                        </p>

                    </div>
                ) : (
                    <ProductGrid items={items.slice(0, 8)} />
                )}

            </div>

        </section>
    );
};

export default FeaturedProducts;