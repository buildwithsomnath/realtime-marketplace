import { useEffect, useState } from "react";
import { getMyItems } from "../api/dashboard";
import ItemCard from "../components/items/ItemCard";

const MyItems = () => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        getMyItems().then((res) => setItems(res.data));
    }, []);

    return (
        <div className="grid gap-6 md:grid-cols-3">

            {items.map((item) => (
                <ItemCard key={item.id} item={item} />
            ))}

        </div>
    );
};

export default MyItems;