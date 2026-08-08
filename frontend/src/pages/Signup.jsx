import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    UserIcon,
    EnvelopeIcon,
    LockClosedIcon,
    UserPlusIcon,
} from "@heroicons/react/24/outline";

import useAuth from "../hooks/useAuth";
import "../styles/auth.css";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!form.username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!form.email.trim()) {
            setError("Email is required.");
            return;
        }

        if (form.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        if (form.password !== form.password2) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await signup({
                username: form.username,
                email: form.email,
                password: form.password,
                password2: form.password2,
            });

            navigate("/login");
        } catch (err) {
            console.error(err);

            const responseData = err?.response?.data;

            if (responseData) {
                if (typeof responseData === "string") {
                    setError(responseData);
                } else {
                    const firstError = Object.values(responseData)
                        .flat()
                        .find(Boolean);

                    setError(firstError || "Unable to create account.");
                }
            } else {
                setError("Unable to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* Left Side */}

                <div className="auth-info">

                    <div className="auth-info-badge">
                        <UserPlusIcon />
                        Join the marketplace
                    </div>

                    <h1>
                        Start buying,
                        <br />
                        <span>selling & connecting.</span>
                    </h1>

                    <p>
                        Create your account and start discovering
                        products from local sellers.
                    </p>

                    <div className="auth-benefits">

                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">
                                <UserIcon />
                            </div>

                            <div>
                                <strong>Personal profile</strong>
                                <span>
                                    Manage your marketplace activity.
                                </span>
                            </div>
                        </div>

                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">
                                <EnvelopeIcon />
                            </div>

                            <div>
                                <strong>Real-time conversations</strong>
                                <span>
                                    Connect directly with buyers and sellers.
                                </span>
                            </div>
                        </div>

                        <div className="auth-benefit">
                            <div className="auth-benefit-icon">
                                <LockClosedIcon />
                            </div>

                            <div>
                                <strong>Secure account</strong>
                                <span>
                                    Your account is protected by authentication.
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Signup Card */}

                <div className="auth-card">

                    <div className="auth-card-header">

                        <h2>
                            Create account
                        </h2>

                        <p>
                            Join our marketplace today.
                        </p>

                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="auth-form"
                    >

                        {/* Username */}

                        <div className="auth-field">

                            <label htmlFor="username">
                                Username
                            </label>

                            <div className="auth-input-wrapper">

                                <UserIcon className="auth-input-icon" />

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    required
                                />

                            </div>

                        </div>

                        {/* Email */}

                        <div className="auth-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <div className="auth-input-wrapper">

                                <EnvelopeIcon className="auth-input-icon" />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    required
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div className="auth-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="auth-input-wrapper">

                                <LockClosedIcon className="auth-input-icon" />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    autoComplete="new-password"
                                    required
                                />

                            </div>

                        </div>

                        {/* Confirm Password */}

                        <div className="auth-field">

                            <label htmlFor="password2">
                                Confirm password
                            </label>

                            <div className="auth-input-wrapper">

                                <LockClosedIcon className="auth-input-icon" />

                                <input
                                    id="password2"
                                    name="password2"
                                    type="password"
                                    value={form.password2}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    autoComplete="new-password"
                                    required
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading ? (
                                "Creating account..."
                            ) : (
                                <>
                                    <UserPlusIcon />
                                    Create account
                                </>
                            )}
                        </button>

                    </form>

                    <div className="auth-footer">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Signup;