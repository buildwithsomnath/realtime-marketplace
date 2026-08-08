import { useEffect, useState } from "react";
import {
    UserCircleIcon,
    EnvelopeIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import useAuth from "../hooks/useAuth";
import { updateProfile } from "../api/auth";

import "../styles/profile.css";

const Profile = () => {
    const { user, loading, loadUser } = useAuth();

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    useEffect(() => {
        if (!user) return;

        setForm({
            username: user.username || "",
            email: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
        });
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleEdit = () => {
        setEditing(true);
        setError("");
        setSuccess("");
    };

    const handleCancel = () => {
        if (user) {
            setForm({
                username: user.username || "",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
            });
        }

        setEditing(false);
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            await updateProfile(form);

            await loadUser();

            setEditing(false);

            setSuccess("Profile updated successfully.");

        } catch (err) {
            console.error(err);

            setError(
                err?.response?.data?.detail ||
                "Failed to update profile."
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-error">
                Unable to load profile.
            </div>
        );
    }

    const initials = (
        `${user.first_name?.charAt(0) || user.username?.charAt(0) || ""}${user.last_name?.charAt(0) || ""}`
    ).toUpperCase();

    const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        user.username;

    return (
        <div className="profile-page">

            {/* HEADER */}

            <div className="profile-page-header">

                <div>
                    <span className="profile-eyebrow">
                        Account
                    </span>

                    <h1 className="profile-page-title">
                        My Profile
                    </h1>

                    <p className="profile-page-description">
                        Manage your personal information and
                        account details.
                    </p>
                </div>

                {/* THIS IS THE EDIT BUTTON */}

                {!editing && (
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="profile-edit-button"
                    >
                        <PencilSquareIcon
                            style={{
                                width: "20px",
                                height: "20px",
                            }}
                        />

                        <span>
                            Edit Profile
                        </span>
                    </button>
                )}

            </div>

            {/* SUCCESS */}

            {success && (
                <div className="profile-success">
                    <CheckIcon />
                    {success}
                </div>
            )}

            {/* ERROR */}

            {error && (
                <div className="profile-error-message">
                    <XMarkIcon />
                    {error}
                </div>
            )}

            <div className="profile-grid">

                {/* USER CARD */}

                <div className="profile-card profile-user-card">

                    <div className="profile-avatar">
                        {initials || (
                            <UserCircleIcon />
                        )}
                    </div>

                    <h2>
                        {fullName}
                    </h2>

                    <p>
                        @{user.username}
                    </p>

                    <div className="profile-status">
                        <span />
                        Active account
                    </div>

                </div>

                {/* INFORMATION CARD */}

                <div className="profile-card">

                    <div className="profile-card-header">

                        <div>
                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Your account details
                            </p>
                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="profile-form-grid">

                            {/* Username */}

                            <div className="profile-field">

                                <label>
                                    Username
                                </label>

                                <div className="profile-input-wrapper">

                                    <UserCircleIcon />

                                    <input
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />

                                </div>

                            </div>

                            {/* Email */}

                            <div className="profile-field">

                                <label>
                                    Email
                                </label>

                                <div className="profile-input-wrapper">

                                    <EnvelopeIcon />

                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        disabled={!editing}
                                    />

                                </div>

                            </div>

                            {/* First Name */}

                            <div className="profile-field">

                                <label>
                                    First Name
                                </label>

                                <input
                                    name="first_name"
                                    value={form.first_name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />

                            </div>

                            {/* Last Name */}

                            <div className="profile-field">

                                <label>
                                    Last Name
                                </label>

                                <input
                                    name="last_name"
                                    value={form.last_name}
                                    onChange={handleChange}
                                    disabled={!editing}
                                />

                            </div>

                        </div>

                        {/* SAVE / CANCEL */}

                        {editing && (
                            <div className="profile-form-actions">

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="profile-cancel-button"
                                    disabled={saving}
                                >
                                    <XMarkIcon />
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                    disabled={saving}
                                >
                                    <CheckIcon />

                                    {saving
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                            </div>
                        )}

                    </form>

                </div>

            </div>

        </div>
    );
};

export default Profile;