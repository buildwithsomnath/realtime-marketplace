import { Link } from "react-router-dom";

const MobileMenu = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-3 lg:hidden">

            <Link to="/">🏠</Link>

            <Link to="/items">🔍</Link>

            <Link to="/dashboard/items/create">➕</Link>

            <Link to="/conversations">💬</Link>

            <Link to="/profile">👤</Link>

        </div>
    );
};

export default MobileMenu;