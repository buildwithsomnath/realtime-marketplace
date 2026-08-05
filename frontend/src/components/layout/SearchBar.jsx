import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const SearchBar = () => {
    return (
        <div className="relative hidden w-full max-w-md lg:block">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />

            <input
                type="text"
                placeholder="Search products..."
                className="w-full rounded-xl border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-indigo-500 focus:bg-white focus:outline-none"
            />
        </div>
    );
};

export default SearchBar;