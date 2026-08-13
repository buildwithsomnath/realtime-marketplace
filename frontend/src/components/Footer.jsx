import { Link } from "react-router-dom";

import "../styles/footer.css";

const Footer = () => {
    return (
        <footer className="footer">

            <div className="container footer-inner">

                <div>
                    <div className="footer-brand">
                        Marketplace
                    </div>

                    <p className="footer-description">
                        A modern online marketplace where
                        buyers and sellers can connect,
                        discover products, and communicate
                        in real time.
                    </p>
                </div>

                <div>
                    <div className="footer-title">
                        Marketplace
                    </div>

                    <div className="footer-links">
                        <Link to="/items">
                            Browse Items
                        </Link>

                        <Link to="/items">
                            Search
                        </Link>
                    </div>
                </div>

                <div>
                    <div className="footer-title">
                        Account
                    </div>

                    <div className="footer-links">
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/signup">
                            Create Account
                        </Link>
                    </div>
                </div>

            </div>

            <div className="container footer-bottom">
                © {new Date().getFullYear()} Online
                Marketplace. All rights reserved.
            </div>

        </footer>
    );
};

export default Footer;