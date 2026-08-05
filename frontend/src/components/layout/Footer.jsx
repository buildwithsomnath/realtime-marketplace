import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-20 border-t bg-white">

            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-3">

                <div>

                    <h2 className="text-2xl font-bold text-indigo-600">
                        Marketplace
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Buy, Sell and Chat in Real-Time.
                    </p>

                </div>

                <div>

                    <h3 className="mb-4 font-semibold">
                        Quick Links
                    </h3>

                    <div className="space-y-2">

                        <Link to="/">Home</Link>

                        <br />

                        <Link to="/items">
                            Browse Items
                        </Link>

                    </div>

                </div>

                <div>

                    <h3 className="mb-4 font-semibold">
                        Contact
                    </h3>

                    <p>somnath@example.com</p>

                </div>

            </div>

        </footer>
    );
};

export default Footer;