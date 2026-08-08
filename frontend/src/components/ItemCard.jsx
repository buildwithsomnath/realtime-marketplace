import {
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";

import { Link } from "react-router-dom";

import "../styles/cards.css";


const ItemCard = ({ item }) => {

    return (
        <article className="item-card">

            {/* Image */}
            <Link
                to={`/items/${item.id}`}
                className="item-card-image-link"
            >

                <div className="item-card-image">

                    {item.image ? (
                        <img
                            src={item.image}
                            alt={item.name || "Item"}
                        />
                    ) : (
                        <div className="item-card-placeholder">
                            <ShoppingBagIcon />
                        </div>
                    )}

                    {!item.is_sold && (
                        <span className="item-card-status">
                            Available
                        </span>
                    )}

                    {item.is_sold && (
                        <span className="item-card-status sold">
                            Sold
                        </span>
                    )}

                </div>

            </Link>


            {/* Item information */}
            <div className="item-card-body">

                {/* Category */}
                {item.category_name && (
                    <div className="item-card-category">
                        {item.category_name}
                    </div>
                )}


                {/* Name */}
                <Link
                    to={`/items/${item.id}`}
                >

                    <h3 className="item-card-title">
                        {item.name || "Untitled Item"}
                    </h3>

                </Link>


                {/* Description */}
                {item.description && (
                    <p className="item-card-description">
                        {item.description}
                    </p>
                )}


                {/* Footer */}
                <div className="item-card-footer">

                    <span className="item-card-price">
                        ₹
                        {Number(
                            item.price || 0
                        ).toLocaleString("en-IN")}
                    </span>

                </div>

            </div>

        </article>
    );
};


export default ItemCard;