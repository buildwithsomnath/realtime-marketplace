import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex h-[70vh] flex-col items-center justify-center">

            <h1 className="text-6xl font-bold">
                404
            </h1>

            <p className="my-4 text-gray-500">
                Page not found.
            </p>

            <Link
                to="/"
                className="rounded bg-blue-600 px-6 py-2 text-white"
            >
                Go Home
            </Link>

        </div>
    );
};

export default NotFound;