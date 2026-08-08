import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    ArrowRightIcon,
    LockClosedIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

import useAuth from "../hooks/useAuth";

import "../styles/auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        username: "",
        password: "",
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

        if (!form.username.trim() || !form.password) {
            setError("Please enter your username and password.");
            return;
        }

        try {
            setLoading(true);

            await login(form);

            navigate("/dashboard", {
                replace: true,
            });
        } catch (err) {
            console.error("Login error:", err);

            if (err.response?.data) {
                const data = err.response.data;

                if (data.detail) {
                    setError(data.detail);
                } else if (data.message) {
                    setError(data.message);
                } else {
                    setError("Invalid username or password.");
                }
            } else {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-container">

                {/* =========================
                    Left / Branding
                ========================= */}

                <div className="auth-brand">

                    <div className="auth-brand-badge">
                        Marketplace
                    </div>

                    <h1>
                        Welcome
                        <br />
                        <span>back.</span>
                    </h1>

                    <p>
                        Sign in to manage your listings,
                        connect with buyers and sellers,
                        and continue exploring the marketplace.
                    </p>

                    <div className="auth-brand-features">

                        <div className="auth-brand-feature">
                            <span className="auth-feature-dot" />
                            Discover products
                        </div>

                        <div className="auth-brand-feature">
                            <span className="auth-feature-dot" />
                            Real-time conversations
                        </div>

                        <div className="auth-brand-feature">
                            <span className="auth-feature-dot" />
                            Manage your listings
                        </div>

                    </div>

                </div>


                {/* =========================
                    Login Card
                ========================= */}

                <div className="auth-card">

                    <div className="auth-card-header">

                        <h2>
                            Sign in
                        </h2>

                        <p>
                            Enter your account details below.
                        </p>

                    </div>


                    {/* Error */}

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        {/* Username */}

                        <div className="form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <div className="input-wrapper">

                                <UserIcon className="input-icon" />

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={form.username}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    autoComplete="username"
                                    disabled={loading}
                                />

                            </div>

                        </div>


                        {/* Password */}

                        <div className="form-group">

                            <div className="form-label-row">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>

                            <div className="input-wrapper">

                                <LockClosedIcon className="input-icon" />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                />

                            </div>

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="auth-spinner" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRightIcon />
                                </>
                            )}

                        </button>

                    </form>


                    {/* Signup */}

                    <div className="auth-footer">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/signup">
                            Create an account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;