import {
    ShoppingBagIcon,
    ChatBubbleLeftRightIcon,
    ShieldCheckIcon,
    MagnifyingGlassIcon,
    BoltIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import "../styles/home.css";

const Home = () => {
    return (
        <div className="home">

            {/* =========================
                Hero
            ========================= */}

            <section className="hero">

                <div className="container hero-grid">

                    <div className="hero-content">

                        <div className="hero-badge">
                            <span className="hero-badge-dot" />
                            Modern local marketplace
                        </div>

                        <h1 className="hero-title">
                            Buy. Sell.
                            <br />
                            <span>Connect.</span>
                        </h1>

                        <p className="hero-description">
                            Discover great products from local
                            sellers, list your own items, and
                            communicate directly through real-time
                            messaging.
                        </p>

                        <div className="hero-actions">

                            <Link
                                to="/items"
                                className="btn btn-primary"
                            >
                                Browse items
                            </Link>

                            <Link
                                to="/signup"
                                className="btn btn-secondary"
                            >
                                Start selling
                            </Link>

                        </div>

                    </div>


                    {/* Hero marketplace preview */}

                    <div className="hero-visual">

                        <div className="hero-card">

                            <div className="hero-card-header">

                                <div className="hero-card-title">
                                    Latest listings
                                </div>

                                <div className="hero-card-status">
                                    <span />
                                    Live
                                </div>

                            </div>


                            {/* Product 1 */}

                            <div className="hero-product">

                                <div className="hero-product-image">
                                    <ShoppingBagIcon />
                                </div>

                                <div className="hero-product-info">

                                    <div className="hero-product-name">
                                        Modern Laptop
                                    </div>

                                    <div className="hero-product-meta">
                                        Electronics · New
                                    </div>

                                </div>

                                <div className="hero-product-price">
                                    ₹45,000
                                </div>

                            </div>


                            {/* Product 2 */}

                            <div className="hero-product">

                                <div className="hero-product-image">
                                    <BoltIcon />
                                </div>

                                <div className="hero-product-info">

                                    <div className="hero-product-name">
                                        Gaming Console
                                    </div>

                                    <div className="hero-product-meta">
                                        Electronics · Used
                                    </div>

                                </div>

                                <div className="hero-product-price">
                                    ₹28,000
                                </div>

                            </div>


                            {/* Product 3 */}

                            <div className="hero-product">

                                <div className="hero-product-image">
                                    <ShoppingBagIcon />
                                </div>

                                <div className="hero-product-info">

                                    <div className="hero-product-name">
                                        Office Chair
                                    </div>

                                    <div className="hero-product-meta">
                                        Furniture
                                    </div>

                                </div>

                                <div className="hero-product-price">
                                    ₹6,500
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                Features
            ========================= */}

            <section className="features">

                <div className="container">

                    <div className="section-heading">

                        <div className="section-label">
                            Everything you need
                        </div>

                        <h2 className="section-title">
                            A simpler way to buy and sell
                        </h2>

                        <p className="section-description">
                            Everything is designed around making
                            marketplace interactions simple,
                            transparent, and convenient.
                        </p>

                    </div>


                    <div className="feature-grid">

                        <FeatureCard
                            icon={<MagnifyingGlassIcon />}
                            title="Discover products"
                            description="Search and explore listings by category, price, and other useful filters."
                        />

                        <FeatureCard
                            icon={<ChatBubbleLeftRightIcon />}
                            title="Real-time messaging"
                            description="Talk directly with sellers and buyers without leaving the marketplace."
                        />

                        <FeatureCard
                            icon={<ShieldCheckIcon />}
                            title="Secure accounts"
                            description="Authentication and protected APIs keep your marketplace account secure."
                        />

                    </div>

                </div>

            </section>


            {/* =========================
                CTA
            ========================= */}

            <section className="home-cta">

                <div className="container">

                    <div className="cta-box">

                        <div>

                            <h2 className="cta-title">
                                Ready to sell something?
                            </h2>

                            <p className="cta-description">
                                Create your account and publish
                                your first listing in minutes.
                            </p>

                        </div>

                        <Link
                            to="/signup"
                            className="btn btn-primary"
                        >
                            Create an account
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
};


/* =========================
   Feature Card
========================= */

const FeatureCard = ({
    icon,
    title,
    description,
}) => {
    return (
        <article className="feature-card">

            <div className="feature-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <p>
                {description}
            </p>

        </article>
    );
};


export default Home;