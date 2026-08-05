import ItemCard from "./ItemCard";

const ProductGrid = ({ items }) => {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    item={item}
                />
            ))}

        </div>
    );
};

export default ProductGrid;