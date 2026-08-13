import { useEffect, useMemo, useState } from "react";
import {
    MagnifyingGlassIcon,
    FunnelIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import { getItems, getCategories } from "../api/items";
import ItemCard from "../components/ItemCard";
import Loading from "../components/Loading";

import "../styles/search.css";

const Search = () => {

    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("newest");

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // --------------------------------
    // Load items
    // --------------------------------

    useEffect(() => {

        const loadItems = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getItems();

                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data.results || [];

                setItems(data);

            } catch (err) {

                console.error(
                    "SEARCH ITEMS ERROR:",
                    err.response?.data || err
                );

                setError(
                    "Unable to load marketplace items."
                );

            } finally {

                setLoading(false);

            }

        };

        loadItems();

    }, []);

    // --------------------------------
    // Load categories
    // --------------------------------

    useEffect(() => {

        const loadCategories = async () => {

            try {

                const response = await getCategories();

                const data = Array.isArray(response.data)
                    ? response.data
                    : response.data.results || [];

                setCategories(data);

            } catch (err) {

                console.error(
                    "CATEGORY ERROR:",
                    err.response?.data || err
                );

            }

        };

        loadCategories();

    }, []);

    // --------------------------------
    // Filter + sort
    // --------------------------------

    const filteredItems = useMemo(() => {

        let result = [...items];

        // Search
        if (search.trim()) {

            const query =
                search.trim().toLowerCase();

            result = result.filter((item) => {

                const name =
                    item.name?.toLowerCase() || "";

                const description =
                    item.description?.toLowerCase() || "";

                const categoryName =
                    item.category_name?.toLowerCase() ||
                    item.category?.name?.toLowerCase() ||
                    "";

                return (
                    name.includes(query) ||
                    description.includes(query) ||
                    categoryName.includes(query)
                );

            });

        }

        // Category
        if (category) {

            result = result.filter(
                (item) =>
                    String(item.category) ===
                    String(category)
            );

        }

        // Minimum price
        if (minPrice !== "") {

            result = result.filter(
                (item) =>
                    Number(item.price) >=
                    Number(minPrice)
            );

        }

        // Maximum price
        if (maxPrice !== "") {

            result = result.filter(
                (item) =>
                    Number(item.price) <=
                    Number(maxPrice)
            );

        }

        // Sort
        if (sort === "price-low") {

            result.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

        }

        if (sort === "price-high") {

            result.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

        }

        if (sort === "newest") {

            result.sort(
                (a, b) =>
                    new Date(b.created_at) -
                    new Date(a.created_at)
            );

        }

        if (sort === "oldest") {

            result.sort(
                (a, b) =>
                    new Date(a.created_at) -
                    new Date(b.created_at)
            );

        }

        return result;

    }, [
        items,
        search,
        category,
        minPrice,
        maxPrice,
        sort,
    ]);

    // --------------------------------
    // Clear filters
    // --------------------------------

    const clearFilters = () => {

        setSearch("");
        setCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSort("newest");

    };

    const hasFilters =
        search ||
        category ||
        minPrice ||
        maxPrice ||
        sort !== "newest";

    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {
        return <Loading />;
    }

    // --------------------------------
    // Error
    // --------------------------------

    if (error) {

        return (
            <div className="search-state">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

            </div>
        );

    }

    return (
        <div className="search-page">

            {/* --------------------------------
                Header
            -------------------------------- */}

            <section className="search-header">

                <div>

                    <span className="search-eyebrow">
                        MARKETPLACE
                    </span>

                    <h1>
                        Browse items
                    </h1>

                    <p>
                        Discover products from local
                        sellers.
                    </p>

                </div>

            </section>


            {/* --------------------------------
                Search bar
            -------------------------------- */}

            <section className="search-controls">

                <div className="search-input-wrapper">

                    <MagnifyingGlassIcon />

                    <input
                        type="text"
                        placeholder="Search for items..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (
                        <button
                            type="button"
                            className="search-clear"
                            onClick={() =>
                                setSearch("")
                            }
                        >
                            <XMarkIcon />
                        </button>
                    )}

                </div>

            </section>


            {/* --------------------------------
                Filters
            -------------------------------- */}

            <section className="filter-bar">

                <div className="filter-title">

                    <FunnelIcon />

                    <span>
                        Filters
                    </span>

                </div>


                {/* Category */}

                <div className="filter-field">

                    <label htmlFor="category">
                        Category
                    </label>

                    <select
                        id="category"
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                    >

                        <option value="">
                            All categories
                        </option>

                        {categories.map(
                            (cat) => (
                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.name}
                                </option>
                            )
                        )}

                    </select>

                </div>


                {/* Minimum price */}

                <div className="filter-field">

                    <label htmlFor="min-price">
                        Min price
                    </label>

                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        placeholder="₹0"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value)
                        }
                    />

                </div>


                {/* Maximum price */}

                <div className="filter-field">

                    <label htmlFor="max-price">
                        Max price
                    </label>

                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        placeholder="₹100000"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value)
                        }
                    />

                </div>


                {/* Sort */}

                <div className="filter-field">

                    <label htmlFor="sort">
                        Sort by
                    </label>

                    <select
                        id="sort"
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                    >

                        <option value="newest">
                            Newest
                        </option>

                        <option value="oldest">
                            Oldest
                        </option>

                        <option value="price-low">
                            Price: Low to high
                        </option>

                        <option value="price-high">
                            Price: High to low
                        </option>

                    </select>

                </div>


                {hasFilters && (
                    <button
                        type="button"
                        className="clear-filters"
                        onClick={clearFilters}
                    >
                        <XMarkIcon />
                        Clear
                    </button>
                )}

            </section>


            {/* --------------------------------
                Results header
            -------------------------------- */}

            <div className="results-header">

                <div>

                    <strong>
                        {filteredItems.length}
                    </strong>

                    <span>
                        {" "}
                        {filteredItems.length === 1
                            ? "item"
                            : "items"} found
                    </span>

                </div>

            </div>


            {/* --------------------------------
                Results
            -------------------------------- */}

            {filteredItems.length > 0 ? (

                <div className="search-results">

                    {filteredItems.map(
                        (item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                            />
                        )
                    )}

                </div>

            ) : (

                <div className="search-empty">

                    <div className="search-empty-icon">
                        <MagnifyingGlassIcon />
                    </div>

                    <h2>
                        No items found
                    </h2>

                    <p>
                        Try changing your search
                        or adjusting the filters.
                    </p>

                    {hasFilters && (
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="clear-empty-button"
                        >
                            Clear filters
                        </button>
                    )}

                </div>

            )}

        </div>
    );
};

export default Search;