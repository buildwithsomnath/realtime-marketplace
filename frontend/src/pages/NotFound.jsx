import { Link } from "react-router-dom";
import "../styles/not-found.css";

const NotFound = () => {
    return (
        <div className="not-found-page">

            <div className="not-found-content">

                <div className="not-found-code">
                    404
                </div>

                <h1>
                    Page not found
                </h1>

                <p>
                    Sorry, the page you're looking for doesn't exist
                    or may have been moved.
                </p>

                <div className="not-found-actions">

                    <Link
                        to="/"
                        className="not-found-primary"
                    >
                        Go Home
                    </Link>

                    <Link
                        to="/items"
                        className="not-found-secondary"
                    >
                        Browse Items
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default NotFound;