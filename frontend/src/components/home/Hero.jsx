import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white">

      {/* Background Blur */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-indigo-500 opacity-30 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            🚀 Buy • Sell • Chat in Real-Time
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">
            Find Amazing Products Near You
          </h1>

          <p className="mt-6 text-lg text-indigo-100">
            Discover thousands of products from trusted sellers.
            Buy securely, sell easily, and chat instantly with buyers
            using our real-time marketplace.
          </p>

          {/* Search */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <div className="relative flex-1">

              <MagnifyingGlassIcon className="search-icon" />

              <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-xl py-4 pl-12 pr-4 text-black outline-none"
              />

            </div>

            <button className="rounded-xl bg-emerald-500 px-8 py-4 font-semibold transition hover:bg-emerald-600">
              Search
            </button>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">

            <Link
              to="/items"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-gray-200"
            >
              Browse Products
            </Link>

            <Link
              to="/signup"
              className="rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-indigo-700"
            >
              Become Seller
            </Link>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >

          <div className="rounded-3xl bg-white p-8 shadow-2xl">

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900"
              alt="Marketplace"
              className="rounded-2xl"
            />

            <div className="mt-6 grid grid-cols-3 gap-4">

              <div className="rounded-xl bg-indigo-50 p-4 text-center">

                <ShoppingBagIcon className="mx-auto h-8 w-8 text-indigo-600" />

                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  1200+
                </h2>

                <p className="text-sm text-gray-500">
                  Products
                </p>

              </div>

              <div className="rounded-xl bg-green-50 p-4 text-center">

                <ChatBubbleLeftRightIcon className="mx-auto h-8 w-8 text-green-600" />

                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  450+
                </h2>

                <p className="text-sm text-gray-500">
                  Chats
                </p>

              </div>

              <div className="rounded-xl bg-yellow-50 p-4 text-center">

                <ShoppingBagIcon className="mx-auto h-8 w-8 text-yellow-600" />

                <h2 className="mt-2 text-xl font-bold text-gray-800">
                  300+
                </h2>

                <p className="text-sm text-gray-500">
                  Sellers
                </p>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default Hero;