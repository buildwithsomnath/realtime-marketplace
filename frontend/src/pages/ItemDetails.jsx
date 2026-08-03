import { useParams } from "react-router-dom";

const ItemDetails = () => {

    const { id } = useParams();

    return (
        <div>

            <h1 className="text-3xl font-bold">
                Item #{id}
            </h1>

        </div>
    );
};

export default ItemDetails;