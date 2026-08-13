import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeftIcon,
    PhotoIcon,
    XMarkIcon,
    CheckIcon,
} from "@heroicons/react/24/outline";

import {
    getItem,
    updateItem,
    getCategories,
} from "../api/items";

import "../styles/edit-item.css";


const EditItem = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // ---------------------------------------
    // Form state
    // ---------------------------------------

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
    });

    // ---------------------------------------
    // Other state
    // ---------------------------------------

    const [categories, setCategories] = useState([]);

    const [currentImage, setCurrentImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // =======================================
    // LOAD ITEM
    // =======================================

    useEffect(() => {

        const loadData = async () => {

            try {

                setLoading(true);
                setError("");

                const [
                    itemResponse,
                    categoryResponse,
                ] = await Promise.all([
                    getItem(id),
                    getCategories(),
                ]);

                const item = itemResponse.data;

                // --------------------------------
                // Categories
                // --------------------------------

                const categoryData =
                    Array.isArray(categoryResponse.data)
                        ? categoryResponse.data
                        : categoryResponse.data.results || [];

                setCategories(categoryData);


                // --------------------------------
                // Item data
                // --------------------------------

                setForm({
                    name: item.name || "",

                    description:
                        item.description || "",

                    price:
                        item.price ?? "",

                    category:
                        typeof item.category === "object"
                            ? item.category.id
                            : item.category || "",

                    image: null,
                });


                // --------------------------------
                // Current image
                // --------------------------------

                if (item.image) {

                    const imageUrl =
                        item.image.startsWith("http")
                            ? item.image
                            : `http://127.0.0.1:8000${item.image}`;

                    setCurrentImage(imageUrl);

                }

            } catch (err) {

                console.error(
                    "EDIT ITEM LOAD ERROR:",
                    err.response?.data || err
                );

                setError(
                    "Unable to load this item."
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id]);


    // =======================================
    // HANDLE INPUT
    // =======================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // =======================================
    // HANDLE IMAGE
    // =======================================

    const handleImageChange = (event) => {

        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }


        // --------------------------------
        // Validate file type
        // --------------------------------

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {

            setError(
                "Please select a JPG, PNG, or WEBP image."
            );

            event.target.value = "";

            return;
        }


        // --------------------------------
        // Validate file size
        // Maximum: 5 MB
        // --------------------------------

        const maxSize =
            5 * 1024 * 1024;

        if (file.size > maxSize) {

            setError(
                "Image size must be less than 5 MB."
            );

            event.target.value = "";

            return;
        }


        // Clear previous error

        setError("");


        // --------------------------------
        // Store File object
        // --------------------------------

        setForm((previous) => ({
            ...previous,
            image: file,
        }));


        // --------------------------------
        // Create preview
        // --------------------------------

        const imagePreview =
            URL.createObjectURL(file);

        setPreview(imagePreview);

    };


    // =======================================
    // REMOVE NEW IMAGE
    // =======================================

    const removeSelectedImage = () => {

        setForm((previous) => ({
            ...previous,
            image: null,
        }));

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        setPreview(null);

    };


    // =======================================
    // SUBMIT
    // =======================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // --------------------------------
        // Validation
        // --------------------------------

        if (!form.name.trim()) {

            setError(
                "Please enter an item name."
            );

            return;
        }


        if (
            !form.price ||
            Number(form.price) <= 0
        ) {

            setError(
                "Please enter a valid price."
            );

            return;
        }


        if (!form.category) {

            setError(
                "Please select a category."
            );

            return;
        }


        setSaving(true);


        try {

            // =================================
            // CREATE MULTIPART FORM DATA
            // =================================

            const formData = new FormData();


            formData.append(
                "name",
                form.name.trim()
            );


            formData.append(
                "description",
                form.description.trim()
            );


            formData.append(
                "price",
                form.price
            );


            formData.append(
                "category",
                form.category
            );


            // --------------------------------
            // IMPORTANT:
            // Only append image if a NEW
            // image was selected.
            // --------------------------------

            if (form.image instanceof File) {

                formData.append(
                    "image",
                    form.image
                );

            }


            // --------------------------------
            // Debug
            // --------------------------------

            console.log(
                "Updating item:",
                id
            );

            console.log(
                "Selected image:",
                form.image
            );

            console.log(
                "Is File:",
                form.image instanceof File
            );


            for (
                const [key, value]
                of formData.entries()
            ) {

                console.log(
                    "FormData:",
                    key,
                    value
                );

            }


            // =================================
            // UPDATE ITEM
            // =================================

            const response =
                await updateItem(
                    id,
                    formData
                );


            console.log(
                "ITEM UPDATED:",
                response.data
            );


            // --------------------------------
            // Success
            // --------------------------------

            setSuccess(
                "Item updated successfully!"
            );


            // --------------------------------
            // Redirect
            // --------------------------------

            setTimeout(() => {

                navigate(
                    `/items/${id}`
                );

            }, 700);


        } catch (err) {

            console.error(
                "UPDATE ITEM ERROR:",
                err
            );

            console.error(
                "SERVER RESPONSE:",
                err.response?.data
            );


            const serverError =
                err.response?.data;


            // --------------------------------
            // Django validation errors
            // --------------------------------

            if (
                serverError &&
                typeof serverError === "object"
            ) {

                const messages =
                    Object.entries(serverError)
                        .map(
                            ([field, message]) => {

                                const text =
                                    Array.isArray(message)
                                        ? message.join(", ")
                                        : String(message);

                                return `${field}: ${text}`;

                            }
                        )
                        .join("\n");


                setError(messages);

            } else if (serverError) {

                setError(
                    String(serverError)
                );

            } else {

                setError(
                    "Unable to update item. Please try again."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    // =======================================
    // LOADING
    // =======================================

    if (loading) {

        return (
            <div className="edit-item-state">

                <div className="edit-item-spinner" />

                <p>
                    Loading item...
                </p>

            </div>
        );

    }


    // =======================================
    // PAGE
    // =======================================

    return (
        <div className="edit-item-page">

            {/* =================================
                HEADER
            ================================= */}

            <div className="edit-item-header">

                <button
                    type="button"
                    className="edit-back-button"
                    onClick={() =>
                        navigate(`/items/${id}`)
                    }
                >

                    <ArrowLeftIcon />

                    Back to item

                </button>


                <div className="edit-item-label">
                    EDIT LISTING
                </div>


                <h1>
                    Edit your item
                </h1>


                <p>
                    Update the information for your
                    marketplace listing.
                </p>

            </div>


            {/* =================================
                ERROR
            ================================= */}

            {error && (

                <div className="edit-message edit-error">
                    {error}
                </div>

            )}


            {/* =================================
                SUCCESS
            ================================= */}

            {success && (

                <div className="edit-message edit-success">
                    {success}
                </div>

            )}


            {/* =================================
                FORM
            ================================= */}

            <form
                className="edit-item-form"
                onSubmit={handleSubmit}
            >


                {/* =================================
                    ITEM INFORMATION
                ================================= */}

                <section className="edit-form-card">

                    <div className="edit-card-header">

                        <h2>
                            Item information
                        </h2>

                        <p>
                            Update the name and description
                            of your listing.
                        </p>

                    </div>


                    {/* Name */}

                    <div className="edit-form-group">

                        <label htmlFor="name">
                            Item name
                        </label>


                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            maxLength={255}
                            placeholder="Enter item name"
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="edit-form-group">

                        <label htmlFor="description">
                            Description
                        </label>


                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={7}
                            placeholder="Describe your item..."
                        />

                    </div>

                </section>


                {/* =================================
                    PRICE + CATEGORY
                ================================= */}

                <section className="edit-form-card">

                    <div className="edit-card-header">

                        <h2>
                            Pricing & category
                        </h2>

                        <p>
                            Change the price or category
                            of your listing.
                        </p>

                    </div>


                    <div className="edit-form-grid">


                        {/* Price */}

                        <div className="edit-form-group">

                            <label htmlFor="price">
                                Price
                            </label>


                            <div className="edit-price-input">

                                <span>
                                    ₹
                                </span>


                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    required
                                />

                            </div>

                        </div>


                        {/* Category */}

                        <div className="edit-form-group">

                            <label htmlFor="category">
                                Category
                            </label>


                            <select
                                id="category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    Select category
                                </option>


                                {categories.map(
                                    (category) => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>

                </section>


                {/* =================================
                    IMAGE
                ================================= */}

                <section className="edit-form-card">

                    <div className="edit-card-header">

                        <h2>
                            Product image
                        </h2>

                        <p>
                            Upload a new image if you
                            want to replace the current one.
                        </p>

                    </div>


                    {/* ---------------------------------
                        NEW IMAGE PREVIEW
                    --------------------------------- */}

                    {preview ? (

                        <div className="edit-image-preview">

                            <img
                                src={preview}
                                alt="New item preview"
                            />


                            <button
                                type="button"
                                className="edit-remove-image"
                                onClick={
                                    removeSelectedImage
                                }
                            >

                                <XMarkIcon />

                                Remove new image

                            </button>

                        </div>


                    ) : currentImage ? (

                        /* ---------------------------------
                           CURRENT IMAGE
                        --------------------------------- */

                        <div className="edit-current-image">

                            <img
                                src={currentImage}
                                alt={form.name}
                            />


                            <label
                                htmlFor="image"
                                className="replace-image-button"
                            >

                                Replace image

                            </label>

                        </div>


                    ) : (

                        /* ---------------------------------
                           NO IMAGE
                        --------------------------------- */

                        <label
                            htmlFor="image"
                            className="edit-image-upload"
                        >

                            <PhotoIcon />


                            <strong>
                                Upload product image
                            </strong>


                            <span>
                                PNG, JPG or WEBP · Max 5MB
                            </span>

                        </label>

                    )}


                    {/* ---------------------------------
                        FILE INPUT
                    --------------------------------- */}

                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageChange}
                        hidden
                    />

                </section>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="edit-item-actions">

                    <button
                        type="button"
                        className="edit-cancel-button"
                        onClick={() =>
                            navigate(`/items/${id}`)
                        }
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="save-item-button"
                        disabled={saving}
                    >

                        <CheckIcon />


                        <span>
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </span>

                    </button>

                </div>

            </form>

        </div>
    );
};


export default EditItem;