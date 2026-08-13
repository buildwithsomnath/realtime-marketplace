import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeftIcon,
    ChatBubbleLeftRightIcon,
    HeartIcon,
    MapPinIcon,
    ShieldCheckIcon,
    UserCircleIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

import { getItem, deleteItem } from "../api/items";
import useAuth from "../hooks/useAuth";

import "../styles/item-details.css";


const ItemDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { user, authenticated } = useAuth();

    const [item, setItem] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [deleting, setDeleting] = useState(false);
    const [liked, setLiked] = useState(false);


    // --------------------------------
    // Load item
    // --------------------------------

    useEffect(() => {

        const loadItem = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await getItem(id);

                setItem(response.data);

            } catch (err) {

                console.error(
                    "ITEM DETAILS ERROR:",
                    err.response?.data || err
                );

                setError(
                    "Unable to load this item."
                );

            } finally {

                setLoading(false);

            }
        };

        loadItem();

    }, [id]);


    // --------------------------------
    // Delete item
    // --------------------------------

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setDeleting(true);

            await deleteItem(id);

            navigate("/dashboard/items");

        } catch (err) {

            console.error(
                "DELETE ITEM ERROR:",
                err.response?.data || err
            );

            alert(
                "Unable to delete this item."
            );

        } finally {

            setDeleting(false);

        }

    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {

        return (
            <div className="item-details-state">

                <div className="item-details-spinner" />

                <p>
                    Loading item...
                </p>

            </div>
        );

    }


    // --------------------------------
    // Error
    // --------------------------------

    if (error || !item) {

        return (
            <div className="item-details-state">

                <h2>
                    Item not found
                </h2>

                <p>
                    {error ||
                        "This item may have been removed."}
                </p>

                <Link
                    to="/items"
                    className="details-back-button"
                >
                    <ArrowLeftIcon />
                    Back to items
                </Link>

            </div>
        );

    }


    // --------------------------------
    // Ownership
    // --------------------------------

    const isOwner =
        authenticated &&
        user &&
        item.created_by &&
        (
            item.created_by === user.id ||
            item.created_by?.id === user.id
        );


    const getImageUrl = (rawImage) => {
        if (!rawImage) return null;
        if (typeof rawImage !== "string") return null;
        if (
            rawImage.startsWith("http://") ||
            rawImage.startsWith("https://") ||
            rawImage.startsWith("data:")
        ) {
            return rawImage;
        }
        const backendHost = "http://localhost:8000";
        const path = rawImage.startsWith("/") ? rawImage : `/${rawImage}`;
        return `${backendHost}${path}`;
    };

    const imageUrl = getImageUrl(item.image);


    return (
        <div className="item-details-page">

            {/* Back */}

            <Link
                to="/items"
                className="details-back"
            >
                <ArrowLeftIcon />
                Back to marketplace
            </Link>


            <div className="item-details-layout">

                {/* --------------------------------
                    IMAGE
                -------------------------------- */}

                <div className="item-details-image-card">

                    {imageUrl ? (

                        <img
                            src={imageUrl}
                            alt={item.name}
                            className="item-details-image"
                        />

                    ) : (

                        <div className="item-details-no-image">

                            <span>
                                No image available
                            </span>

                        </div>

                    )}

                    {item.is_sold && (
                        <div className="sold-badge">
                            Sold
                        </div>
                    )}

                </div>


                {/* --------------------------------
                    DETAILS
                -------------------------------- */}

                <div className="item-details-content">

                    {/* Category */}

                    {item.category && (
                        <div className="item-category">
                            {typeof item.category === "object"
                                ? item.category.name
                                : "Marketplace item"}
                        </div>
                    )}


                    {/* Title */}

                    <h1 className="item-details-title">
                        {item.name}
                    </h1>


                    {/* Price */}

                    <div className="item-details-price">
                        ₹{Number(item.price).toLocaleString("en-IN")}
                    </div>


                    {/* Description */}

                    <div className="item-description-section">

                        <h2>
                            Description
                        </h2>

                        <p>
                            {item.description ||
                                "No description provided by the seller."}
                        </p>

                    </div>


                    {/* Seller */}

                    <div className="seller-card">

                        <div className="seller-avatar">

                            <UserCircleIcon />

                        </div>

                        <div className="seller-info">

                            <span className="seller-label">
                                Listed by
                            </span>

                            <strong>
                                {item.created_by?.username ||
                                    item.created_by?.name ||
                                    "Seller"}
                            </strong>

                        </div>

                    </div>


                    {/* Actions */}

                    <div className="item-details-actions">

                        {!isOwner && !item.is_sold && (

                            <>

                                <button
                                    className="contact-seller-button"
                                    onClick={() =>
                                        navigate(
                                            `/conversations?item=${item.id}`
                                        )
                                    }
                                >

                                    <ChatBubbleLeftRightIcon />

                                    Contact seller

                                </button>


                                <button
                                    className={`favorite-button ${
                                        liked
                                            ? "liked"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        setLiked(!liked)
                                    }
                                    title="Add to favorites"
                                >

                                    <HeartIcon />

                                </button>

                            </>

                        )}


                        {isOwner && (

                            <>

                                <button
                                    className="edit-item-button"
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/items/${item.id}/edit`
                                        )
                                    }
                                >

                                    <PencilSquareIcon />

                                    Edit item

                                </button>


                                <button
                                    className="delete-item-button"
                                    onClick={handleDelete}
                                    disabled={deleting}
                                >

                                    <TrashIcon />

                                    {deleting
                                        ? "Deleting..."
                                        : "Delete"}

                                </button>

                            </>

                        )}

                    </div>


                    {/* Safety */}

                    <div className="safety-card">

                        <ShieldCheckIcon />

                        <div>

                            <strong>
                                Stay safe
                            </strong>

                            <p>
                                Meet in a public place and
                                never share sensitive
                                account information.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* Item metadata */}

            <div className="item-meta">

                <div>

                    <span>
                        Listed
                    </span>

                    <strong>
                        {new Date(
                            item.created_at
                        ).toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                            }
                        )}
                    </strong>

                </div>

                <div>

                    <span>
                        Status
                    </span>

                    <strong>
                        {item.is_sold
                            ? "Sold"
                            : "Available"}
                    </strong>

                </div>

            </div>

        </div>
    );
};

export default ItemDetails;