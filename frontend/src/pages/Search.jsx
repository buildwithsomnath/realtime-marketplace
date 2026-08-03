import { useState } from "react";

const Search = () => {

    const [query, setQuery] = useState("");

    return (
        <div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full border p-2"
            />

        </div>
    );
};

export default Search;