import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="min-h-screen w-64 border-r bg-white p-5">

      <h2 className="mb-6 text-xl font-bold">
        Dashboard
      </h2>

      <nav className="flex flex-col gap-3">

        <Link to="/dashboard">
          Overview
        </Link>

        <Link to="/dashboard/items">
          My Items
        </Link>

        <Link to="/items/create">
          Add Item
        </Link>

        <Link to="/conversations">
          Conversations
        </Link>

        <Link to="/profile">
          Profile
        </Link>

      </nav>

    </aside>
  );
};

export default Sidebar;