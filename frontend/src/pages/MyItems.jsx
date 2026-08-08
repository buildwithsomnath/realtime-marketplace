import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
    PlusIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CubeIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

import { getMyItems, deleteItem } from "../api/dashboard";

import "../styles/my-items.css";

const MyItems = () => {
    const [items, setItems] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const [deletingId, setDeletingId] = useState(null);

    // --------------------------------
    // Load items
    // --------------------------------

    const loadItems = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getMyItems();

            /*
             * Depending on your Django API,
             * response.data may be:
             *
             * [
             *   {...},
             *   {...}
             * ]
             *
             * OR:
             *
             * {
             *   results: [...]
             * }
             */

            const data = response.data;

            if (Array.isArray(data)) {
                setItems(data);
            } else if (Array.isArray(data.results)) {
                setItems(data.results);
            } else {
                setItems([]);
            }

        } catch (err) {
            console.error("Failed to load items:", err);

            setError(
                err?.response?.data?.detail ||
                "Unable to load your items."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    // --------------------------------
    // Delete item
    // --------------------------------

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);

            await deleteItem(id);

            setItems((previous) =>
                previous.filter((item) => item.id !== id)
            );

        } catch (err) {
            console.error("Delete error:", err);

            alert(
                err?.response?.data?.detail ||
                "Unable to delete this item."
            );

        } finally {
            setDeletingId(null);
        }
    };

    // --------------------------------
    // Filter items
    // --------------------------------

    const filteredItems = useMemo(() => {
        return items.filter((item) => {

            const title =
                item.title ||
                item.name ||
                "";

            const matchesSearch =
                title
                    .toLowerCase()
                    .includes(search.toLowerCase());

            if (status === "all") {
                return matchesSearch;
            }

            const itemStatus =
                item.status ||
                "active";

            return (
                matchesSearch &&
                itemStatus.toLowerCase() ===
                    status.toLowerCase()
            );
        });
    }, [items, search, status]);

    // --------------------------------
    // Statistics
    // --------------------------------

    const totalItems = items.length;

    const activeItems = items.filter(
        (item) =>
            !item.status ||
            item.status === "active"
    ).length;

    const soldItems = items.filter(
        (item) =>
            item.status === "sold"
    ).length;

    const pendingItems = items.filter(
        (item) =>
            item.status === "pending"
    ).length;

    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {
        return (
            <div className="my-items-page">

                <div className="my-items-loading">

                    <div className="loading-spinner" />

                    <p>
                        Loading your items...
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="my-items-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="my-items-header">

                <div>

                    <span className="my-items-eyebrow">
                        Marketplace
                    </span>

                    <h1>
                        My Items
                    </h1>

                    <p>
                        Manage the products you've listed
                        on the marketplace.
                    </p>

                </div>

                <Link
                    to="/dashboard/items/create"
                    className="my-items-create-button"
                >
                    <PlusIcon />

                    Add Item
                </Link>

            </div>

            {/* =========================
                ERROR
            ========================= */}

            {error && (
                <div className="my-items-error">
                    {error}

                    <button onClick={loadItems}>
                        Try again
                    </button>
                </div>
            )}

            {/* =========================
                STATISTICS
            ========================= */}

            <div className="my-items-stats">

                <StatCard
                    icon={<CubeIcon />}
                    label="Total Items"
                    value={totalItems}
                />

                <StatCard
                    icon={<CheckCircleIcon />}
                    label="Active"
                    value={activeItems}
                />

                <StatCard
                    icon={<ClockIcon />}
                    label="Pending"
                    value={pendingItems}
                />

                <StatCard
                    icon={<XCircleIcon />}
                    label="Sold"
                    value={soldItems}
                />

            </div>

            {/* =========================
                TOOLBAR
            ========================= */}

            <div className="my-items-toolbar">

                <div className="my-items-search">

                    <MagnifyingGlassIcon />

                    <input
                        type="text"
                        placeholder="Search your items..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                <div className="my-items-filter">

                    <FunnelIcon />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="all">
                            All Items
                        </option>

                        <option value="active">
                            Active
                        </option>

                        <option value="pending">
                            Pending
                        </option>

                        <option value="sold">
                            Sold
                        </option>

                    </select>

                </div>

            </div>

            {/* =========================
                RESULT COUNT
            ========================= */}

            <div className="my-items-result-count">

                {filteredItems.length}{" "}
                {filteredItems.length === 1
                    ? "item"
                    : "items"}

            </div>

            {/* =========================
                ITEMS
            ========================= */}

            {filteredItems.length === 0 ? (

                <div className="my-items-empty">

                    <div className="empty-icon">
                        <CubeIcon />
                    </div>

                    <h2>
                        No items found
                    </h2>

                    <p>
                        {search
                            ? "Try changing your search."
                            : "You haven't listed any items yet."}
                    </p>

                    {!search && (
                        <Link
                            to="/dashboard/items/create"
                            className="my-items-empty-button"
                        >
                            <PlusIcon />
                            Create your first item
                        </Link>
                    )}

                </div>

            ) : (

                <div className="items-grid">

                    {filteredItems.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            onDelete={handleDelete}
                            deletingId={deletingId}
                        />
                    ))}

                </div>

            )}

        </div>
    );
};


// =====================================
// STAT CARD
// =====================================

const StatCard = ({
    icon,
    label,
    value,
}) => {
    return (
        <div className="my-items-stat-card">

            <div className="my-items-stat-icon">
                {icon}
            </div>

            <div>
                <span>
                    {label}
                </span>

                <strong>
                    {value}
                </strong>
            </div>

        </div>
    );
};


// =====================================
// ITEM CARD
// =====================================

const ItemCard = ({
    item,
    onDelete,
    deletingId,
}) => {

    const title =
        item.title ||
        item.name ||
        "Untitled Item";

    const description =
        item.description ||
        "No description available.";

    const price =
        item.price !== undefined &&
        item.price !== null
            ? `₹${Number(item.price).toLocaleString("en-IN")}`
            : "Price unavailable";

    const image =
        item.image ||
        item.image_url ||
        item.thumbnail ||
        null;

    const itemStatus =
        item.status ||
        "active";

    return (
        <article className="my-item-card">

            {/* IMAGE */}

            <div className="my-item-image">

                {image ? (
                    <img
                        src={image}
                        alt={title}
                    />
                ) : (
                    <CubeIcon />
                )}

                <span
                    className={`item-status item-status-${itemStatus}`}
                >
                    {itemStatus}
                </span>

            </div>

            {/* CONTENT */}

            <div className="my-item-content">

                <h2>
                    {title}
                </h2>

                <p className="my-item-description">
                    {description}
                </p>

                <div className="my-item-price">
                    {price}
                </div>

                {item.category && (
                    <span className="my-item-category">
                        {item.category}
                    </span>
                )}

            </div>

            {/* ACTIONS */}

            <div className="my-item-actions">

                <Link
                    to={`/items/${item.id}`}
                    className="item-action-view"
                >
                    <EyeIcon />

                    View
                </Link>

                <Link
                    to={`/dashboard/items/${item.id}/edit`}
                    className="item-action-edit"
                >
                    <PencilSquareIcon />

                    Edit
                </Link>

                <button
                    type="button"
                    className="item-action-delete"
                    onClick={() =>
                        onDelete(item.id)
                    }
                    disabled={
                        deletingId === item.id
                    }
                >
                    <TrashIcon />

                    {deletingId === item.id
                        ? "Deleting..."
                        : "Delete"}
                </button>

            </div>

        </article>
    );
};

export default MyItems;