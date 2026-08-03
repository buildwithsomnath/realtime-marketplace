import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="overflow-hidden rounded-lg border bg-white shadow">

      <img
        src={item.image}
        alt={item.name}
        className="h-60 w-full object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {item.name}
        </h2>

        <p className="mt-2 text-xl font-bold text-blue-600">
          ₹{item.price}
        </p>

        <p className="mt-2 text-gray-600">
          {item.category}
        </p>

        <Link
          to={`/items/${item.id}`}
          className="mt-4 inline-block rounded bg-blue-600 px-4 py-2 text-white"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ItemCard;