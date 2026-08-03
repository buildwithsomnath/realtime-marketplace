import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("access");

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          Marketplace
        </Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>

          <Link to="/items">Items</Link>

          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>

              <Link to="/conversations">
                Messages
              </Link>

              <Link to="/profile">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded bg-blue-600 px-4 py-2 text-white"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;