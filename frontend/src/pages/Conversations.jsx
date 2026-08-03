import { useEffect, useState } from "react";
import { getConversations } from "../api/conversations";

const Conversations = () => {

    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        getConversations().then((res) => setConversations(res.data));
    }, []);

    return (
        <div>

            <h1 className="mb-5 text-3xl font-bold">
                Conversations
            </h1>

            {conversations.map((c) => (
                <div key={c.id}>
                    Conversation #{c.id}
                </div>
            ))}

        </div>
    );
};

export default Conversations;