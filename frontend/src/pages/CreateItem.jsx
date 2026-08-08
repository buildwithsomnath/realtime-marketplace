import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PlusIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { createItem, getCategories } from "../api/items";

import "../styles/create-item.css";

const CreateItem = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------
  // Load categories
  // --------------------------------

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories();

        /*
         * Depending on your DRF response,
         * categories may be directly in response.data
         * or inside response.data.results.
         */

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.results || [];

        setCategories(data);
      } catch (err) {
        console.error("CATEGORY ERROR:", err.response?.data || err);

        setError("Unable to load categories.");
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  // --------------------------------
  // Handle input
  // --------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // --------------------------------
  // Handle image
  // --------------------------------

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setForm((previous) => ({
      ...previous,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // --------------------------------
  // Remove image
  // --------------------------------

  const removeImage = () => {
    setForm((previous) => ({
      ...previous,
      image: null,
    }));

    setPreview(null);
  };

  // --------------------------------
  // Submit
  // --------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation

    if (!form.name.trim()) {
      setError("Please enter an item name.");

      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setError("Please enter a valid price.");

      return;
    }

    if (!form.category) {
      setError("Please select a category.");

      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name.trim());

      formData.append("description", form.description.trim());

      formData.append("price", form.price);

      formData.append("category", form.category);

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      // DEBUG — check what is actually being sent
      console.log("Creating item...");
      console.log("Image:", form.image);
      console.log("Is image a File?", form.image instanceof File);

      for (const [key, value] of formData.entries()) {
        console.log("FormData:", key, value);
      }

      // Send request
      const response = await createItem(formData);

      console.log("Item created:", response.data);

      setSuccess("Item posted successfully!");

      setTimeout(() => {
        navigate("/dashboard/items");
      }, 700);
    } catch (err) {
      console.error("CREATE ITEM ERROR:", err);

      console.error("SERVER RESPONSE:", err.response?.data);

      const serverError = err.response?.data;

      if (serverError) {
        if (typeof serverError === "object") {
          const messages = Object.entries(serverError)
            .map(
              ([field, message]) =>
                `${field}: ${
                  Array.isArray(message) ? message.join(", ") : message
                }`,
            )
            .join("\n");

          setError(messages);
        } else {
          setError(String(serverError));
        }
      } else {
        setError("Unable to create item. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-item-page">
      {/* Header */}

      <div className="create-item-header">
        <div>
          <div className="page-label">SELL</div>

          <h1>Create a new item</h1>

          <p>Add your product details and publish it to the marketplace.</p>
        </div>
      </div>

      {/* Error */}

      {error && <div className="form-message error-message">{error}</div>}

      {/* Success */}

      {success && <div className="form-message success-message">{success}</div>}

      <form className="create-item-form" onSubmit={handleSubmit}>
        {/* -------------------------
                    Basic Information
                ------------------------- */}

        <section className="form-card">
          <div className="form-card-header">
            <h2>Item information</h2>

            <p>Tell buyers what you are selling.</p>
          </div>

          {/* Name */}

          <div className="form-group">
            <label htmlFor="name">Item name</label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. MacBook Air M2"
              maxLength={255}
              required
            />
          </div>

          {/* Description */}

          <div className="form-group">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the condition, features, age, and other useful details..."
              rows={6}
            />
          </div>
        </section>

        {/* -------------------------
                    Pricing / Category
                ------------------------- */}

        <section className="form-card">
          <div className="form-card-header">
            <h2>Pricing & category</h2>

            <p>Help buyers understand your listing.</p>
          </div>

          <div className="form-grid">
            {/* Price */}

            <div className="form-group">
              <label htmlFor="price">Price</label>

              <div className="price-input">
                <span>₹</span>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Category */}

            <div className="form-group">
              <label htmlFor="category">Category</label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                disabled={categoriesLoading}
                required
              >
                <option value="">
                  {categoriesLoading
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* -------------------------
                    Product Image
                ------------------------- */}

        <section className="form-card">
          <div className="form-card-header">
            <h2>Product image</h2>

            <p>Add a clear image so buyers can see your item.</p>
          </div>

          {!preview ? (
            <label htmlFor="image" className="image-upload">
              <PhotoIcon />

              <strong>Upload product image</strong>

              <span>PNG, JPG or WEBP</span>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                hidden
              />
            </label>
          ) : (
            <div className="image-preview">
              <img src={preview} alt="Product preview" />

              <button
                type="button"
                className="remove-image"
                onClick={removeImage}
              >
                <XMarkIcon />
                Remove image
              </button>
            </div>
          )}
        </section>

        {/* -------------------------
                    Actions
                ------------------------- */}

        <div className="create-item-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/dashboard/items")}
          >
            Cancel
          </button>

          <button type="submit" className="create-button" disabled={loading}>
            <PlusIcon />

            <span>{loading ? "Posting..." : "Post Item"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateItem;
