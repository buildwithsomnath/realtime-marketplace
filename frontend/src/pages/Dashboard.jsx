import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    ChatBubbleLeftRightIcon,
    EnvelopeIcon,
    EyeIcon,
    HeartIcon,
    CurrencyRupeeIcon,
    PlusIcon,
    ArrowRightIcon,
    BellIcon,
    CubeIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import { getDashboard } from "../api/dashboard";
import Loading from "../components/Loading";

import "../styles/dashboard.css";

const Dashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            setLoading(true);

            const response = await getDashboard();

            setDashboard(response.data);
        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.detail ||
                "Unable to load dashboard."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <div className="dashboard-error-icon">
                    !
                </div>

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

                <button
                    onClick={loadDashboard}
                    className="dashboard-retry"
                >
                    Try again
                </button>
            </div>
        );
    }

    /*
     * These defaults make the UI work even if your
     * backend currently returns only part of the data.
     */
    const stats = dashboard?.stats || dashboard || {};

    const conversations =
        dashboard?.recent_conversations || [];

    const items =
        dashboard?.recent_items ||
        dashboard?.recently_added_items ||
        [];

    const profile =
        dashboard?.profile ||
        dashboard?.user ||
        null;

    return (
        <div className="dashboard-page">

            {/* --------------------------------
                Header
            -------------------------------- */}

            <div className="dashboard-header">

                <div>
                    <div className="dashboard-eyebrow">
                        <span />
                        Overview
                    </div>

                    <h1>
                        Welcome back
                        {profile?.username
                            ? `, ${profile.username}`
                            : ""}
                    </h1>

                    <p>
                        Here's what's happening with your
                        marketplace activity.
                    </p>
                </div>

                <Link
                    to="/dashboard/items/create"
                    className="dashboard-add-button"
                >
                    <PlusIcon />
                    Add item
                </Link>

            </div>

            {/* --------------------------------
                Statistics
            -------------------------------- */}

            <section className="dashboard-stats">

                <StatCard
                    icon={<ChatBubbleLeftRightIcon />}
                    label="Conversations"
                    value={
                        stats.total_conversations ??
                        stats.conversations_count ??
                        0
                    }
                    description="Total conversations"
                />

                <StatCard
                    icon={<EnvelopeIcon />}
                    label="Unread messages"
                    value={
                        stats.total_unread_messages ??
                        stats.unread_messages ??
                        0
                    }
                    description="Waiting for your reply"
                    accent
                />

                <StatCard
                    icon={<EyeIcon />}
                    label="Item views"
                    value={
                        stats.item_views ??
                        stats.number_of_item_views ??
                        0
                    }
                    description="Views on your listings"
                />

                <StatCard
                    icon={<HeartIcon />}
                    label="Favorites"
                    value={
                        stats.favorite_count ??
                        stats.wishlist_count ??
                        0
                    }
                    description="Items in your wishlist"
                />

                <StatCard
                    icon={<CurrencyRupeeIcon />}
                    label="Sales value"
                    value={`₹${Number(
                        stats.total_sales_value ?? 0
                    ).toLocaleString("en-IN")}`}
                    description="Total completed sales"
                    wide
                />

            </section>

            {/* --------------------------------
                Main Grid
            -------------------------------- */}

            <div className="dashboard-content">

                {/* Recent Conversations */}

                <section className="dashboard-panel">

                    <div className="panel-header">

                        <div>
                            <span className="panel-label">
                                Messages
                            </span>

                            <h2>
                                Recent conversations
                            </h2>
                        </div>

                        <Link
                            to="/conversations"
                            className="panel-link"
                        >
                            View all
                            <ArrowRightIcon />
                        </Link>

                    </div>

                    <div className="conversation-list">

                        {conversations.length > 0 ? (
                            conversations.map(
                                (conversation) => (
                                    <ConversationRow
                                        key={conversation.id}
                                        conversation={
                                            conversation
                                        }
                                    />
                                )
                            )
                        ) : (
                            <EmptyState
                                icon={
                                    <ChatBubbleLeftRightIcon />
                                }
                                title="No conversations yet"
                                description="Your recent conversations will appear here."
                                action={
                                    <Link to="/items">
                                        Browse items
                                    </Link>
                                }
                            />
                        )}

                    </div>

                </section>

                {/* Recently Added */}

                <section className="dashboard-panel">

                    <div className="panel-header">

                        <div>
                            <span className="panel-label">
                                Inventory
                            </span>

                            <h2>
                                Recently added
                            </h2>
                        </div>

                        <Link
                            to="/dashboard/items"
                            className="panel-link"
                        >
                            View all
                            <ArrowRightIcon />
                        </Link>

                    </div>

                    <div className="recent-items">

                        {items.length > 0 ? (
                            items.map((item) => (
                                <RecentItem
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        ) : (
                            <EmptyState
                                icon={<CubeIcon />}
                                title="No items yet"
                                description="Add your first item to start selling."
                                action={
                                    <Link to="/dashboard/items/create">
                                        Add item
                                    </Link>
                                }
                            />
                        )}

                    </div>

                </section>

            </div>

            {/* --------------------------------
                Bottom Grid
            -------------------------------- */}

            <div className="dashboard-bottom">

                {/* Profile */}

                <section className="dashboard-panel profile-panel">

                    <div className="panel-header">

                        <div>
                            <span className="panel-label">
                                Account
                            </span>

                            <h2>
                                Profile
                            </h2>
                        </div>

                        <Link
                            to="/profile"
                            className="panel-link"
                        >
                            Edit
                            <ArrowRightIcon />
                        </Link>

                    </div>

                    <div className="profile-summary">

                        <div className="profile-avatar">
                            {profile?.username
                                ?.charAt(0)
                                ?.toUpperCase() || (
                                    <UserCircleIcon />
                                )}
                        </div>

                        <div className="profile-details">

                            <h3>
                                {profile?.username ||
                                    "Marketplace User"}
                            </h3>

                            <p>
                                {profile?.email ||
                                    "Manage your profile information"}
                            </p>

                        </div>

                    </div>

                    <div className="profile-actions">

                        <Link to="/profile">
                            View profile
                        </Link>

                        <Link to="/dashboard/items/create">
                            Create listing
                        </Link>

                    </div>

                </section>

            </div>

        </div>
    );
};


/* ============================================
   STAT CARD
============================================ */

const StatCard = ({
    icon,
    label,
    value,
    description,
    accent = false,
    wide = false,
}) => {
    return (
        <div
            className={`stat-card ${accent ? "stat-card-accent" : ""
                } ${wide ? "stat-card-wide" : ""}`}
        >

            <div className="stat-card-top">

                <div className="stat-icon">
                    {icon}
                </div>

                {accent && (
                    <span className="stat-badge">
                        New
                    </span>
                )}

            </div>

            <div className="stat-value">
                {value}
            </div>

            <div className="stat-label">
                {label}
            </div>

            <div className="stat-description">
                {description}
            </div>

        </div>
    );
};


/* ============================================
   CONVERSATION ROW
============================================ */

const ConversationRow = ({
    conversation,
}) => {
    const item =
        conversation.item;

    const participants =
        conversation.participants || [];

    const name =
        participants.length > 0
            ? participants[0]
            : "Marketplace user";

    const unread =
        conversation.unread_count ||
        conversation.unread_messages ||
        0;

    return (
        <Link
            to={`/conversations/${conversation.id}`}
            className="conversation-row"
        >

            <div className="conversation-avatar">
                {String(name)
                    .charAt(0)
                    .toUpperCase()}
            </div>

            <div className="conversation-info">

                <div className="conversation-top">

                    <strong>
                        {name}
                    </strong>

                    {unread > 0 && (
                        <span className="unread-badge">
                            {unread}
                        </span>
                    )}

                </div>

                <p>
                    {conversation.last_message ||
                        conversation.last_message_content ||
                        item?.name ||
                        "Open conversation"}
                </p>

            </div>

            <ArrowRightIcon className="conversation-arrow" />

        </Link>
    );
};


/* ============================================
   RECENT ITEM
============================================ */

const RecentItem = ({ item }) => {

    const getImageUrl = (image) => {

        if (!image) {
            return null;
        }

        // Already a complete URL
        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        // Backend URL
        return `http://127.0.0.1:8000${image.startsWith("/") ? image : `/${image}`
            }`;
    };

    const imageUrl = getImageUrl(item.image);

    return (
        <Link
            to={`/items/${item.id}`}
            className="recent-item"
        >

            <div className="recent-item-image">

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={item.name || "Item"}
                        onError={(e) => {
                            console.error(
                                "IMAGE FAILED:",
                                imageUrl
                            );

                            e.currentTarget.style.display =
                                "none";
                        }}
                    />
                ) : (
                    <CubeIcon />
                )}

            </div>

            <div className="recent-item-info">

                <h3>
                    {item.name ||
                        item.title ||
                        "Untitled item"}
                </h3>

                <span>
                    {item.category_name ||
                        item.category?.name ||
                        item.category ||
                        "Uncategorized"}
                </span>

            </div>

            <div className="recent-item-price">

                ₹
                {Number(
                    item.price || 0
                ).toLocaleString("en-IN")}

            </div>

        </Link>
    );
};



/* ============================================
   EMPTY STATE
============================================ */

const EmptyState = ({
    icon,
    title,
    description,
    action,
}) => {
    return (
        <div className="dashboard-empty">

            <div className="empty-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {description}
            </p>

            {action && (
                <div className="empty-action">
                    {action}
                </div>
            )}

        </div>
    );
};

export default Dashboard;