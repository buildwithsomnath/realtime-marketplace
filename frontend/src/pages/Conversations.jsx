import { useEffect, useState } from "react";
import {
    ChatBubbleLeftRightIcon,
    MagnifyingGlassIcon,
    ArrowRightIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

import {
    Link,
    useSearchParams,
    useNavigate,
} from "react-router-dom";

import {
    getConversations,
    createConversation,
} from "../api/conversations";

import useAuth from "../hooks/useAuth";

import "../styles/conversations.css";

const Conversations = () => {
    const [conversations, setConversations] = useState([]);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // ========================================
    // Load conversations
    // ========================================

    const loadConversations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getConversations();

            const data = response.data;

            if (Array.isArray(data)) {
                setConversations(data);
            } else if (Array.isArray(data?.results)) {
                setConversations(data.results);
            } else {
                setConversations([]);
            }
        } catch (err) {
            console.error(
                "CONVERSATIONS ERROR:",
                err.response?.data || err
            );

            setError(
                err.response?.data?.detail ||
                "Unable to load conversations."
            );
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // Start conversation
    // ========================================

    const startConversation = async (itemId) => {
        if (!itemId) {
            await loadConversations();
            return;
        }

        try {
            setLoading(true);
            setError("");

            console.log(
                "Starting conversation for item:",
                itemId
            );

            const response = await createConversation(itemId);

            console.log(
                "CREATE CONVERSATION RESPONSE:",
                response.data
            );

            /*
             * Expected possible responses:
             *
             * {
             *     "id": 1
             * }
             *
             * OR
             *
             * {
             *     "conversation": {
             *         "id": 1
             *     }
             * }
             */

            const conversation =
                response.data?.conversation ||
                response.data;

            const conversationId =
                conversation?.id;

            if (!conversationId) {
                throw new Error(
                    "Conversation ID was not returned by the server."
                );
            }

            // Remove ?item= from URL by navigating
            // directly to the conversation.
            navigate(
                `/conversations/${conversationId}`,
                {
                    replace: true,
                }
            );
        } catch (err) {
            console.error(
                "START CONVERSATION ERROR:",
                err.response?.data || err
            );

            const serverError =
                err.response?.data;

            if (serverError?.detail) {
                setError(
                    serverError.detail
                );
            } else if (
                serverError &&
                typeof serverError === "object"
            ) {
                const messages =
                    Object.entries(serverError)
                        .map(
                            ([field, message]) =>
                                `${field}: ${
                                    Array.isArray(message)
                                        ? message.join(", ")
                                        : message
                                }`
                        )
                        .join(" ");

                setError(
                    messages ||
                    "Unable to start conversation."
                );
            } else {
                setError(
                    err.message ||
                    "Unable to start conversation."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // ========================================
    // Initial load
    // ========================================

    useEffect(() => {
        const itemId =
            searchParams.get("item");

        if (itemId) {
            startConversation(itemId);
        } else {
            loadConversations();
        }

        // We intentionally run this when the
        // component mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ========================================
    // Search
    // ========================================

    const filteredConversations =
        conversations.filter((conversation) => {
            const item =
                conversation.item || null;

            const itemName =
                item?.name ||
                conversation.item_name ||
                "";

            const participants =
                conversation.participants || [];

            let participantText = "";

            if (Array.isArray(participants)) {
                participantText =
                    participants
                        .map((participant) => {
                            if (
                                typeof participant ===
                                "object"
                            ) {
                                return (
                                    participant.username ||
                                    participant.name ||
                                    ""
                                );
                            }

                            return String(
                                participant
                            );
                        })
                        .join(" ");
            } else {
                participantText =
                    String(participants);
            }

            const lastMessage =
                conversation.last_message ||
                conversation.last_message_content ||
                "";

            const text = `
                ${itemName}
                ${participantText}
                ${lastMessage}
            `.toLowerCase();

            return text.includes(
                search.toLowerCase()
            );
        });

    // ========================================
    // Loading
    // ========================================

    if (loading) {
        return (
            <div className="conversations-page">
                <div className="conversations-state">

                    <div className="conversations-spinner" />

                    <h2>
                        {searchParams.get("item")
                            ? "Starting conversation..."
                            : "Loading conversations..."}
                    </h2>

                    <p>
                        Please wait while we load your messages.
                    </p>

                </div>
            </div>
        );
    }

    // ========================================
    // Page
    // ========================================

    return (
        <div className="conversations-page">

            {/* Header */}

            <div className="conversations-header">

                <div>

                    <span className="conversations-eyebrow">
                        MESSAGES
                    </span>

                    <h1>
                        Conversations
                    </h1>

                    <p>
                        Chat with buyers and sellers
                        about marketplace items.
                    </p>

                </div>

            </div>


            {/* Error */}

            {error && (
                <div className="conversations-error">

                    <strong>
                        Something went wrong
                    </strong>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            const itemId =
                                searchParams.get("item");

                            if (itemId) {
                                startConversation(itemId);
                            } else {
                                loadConversations();
                            }
                        }}
                    >
                        Try again
                    </button>

                </div>
            )}


            {!error && (
                <>

                    {/* Search */}

                    <div className="conversations-toolbar">

                        <div className="conversation-search">

                            <MagnifyingGlassIcon />

                            <input
                                type="text"
                                placeholder="Search conversations..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* Count */}

                    <div className="conversation-count">

                        {filteredConversations.length}{" "}

                        {filteredConversations.length === 1
                            ? "conversation"
                            : "conversations"}

                    </div>


                    {/* Empty */}

                    {filteredConversations.length === 0 ? (

                        <div className="conversations-empty">

                            <div className="conversations-empty-icon">

                                <ChatBubbleLeftRightIcon />

                            </div>

                            <h2>
                                {search
                                    ? "No conversations found"
                                    : "No conversations yet"}
                            </h2>

                            <p>
                                {search
                                    ? "Try searching for something else."
                                    : "When you contact a seller or receive a message, your conversations will appear here."}
                            </p>

                            {!search && (
                                <Link
                                    to="/items"
                                    className="browse-items-button"
                                >
                                    Browse items
                                </Link>
                            )}

                        </div>

                    ) : (

                        <div className="conversation-list">

                            {filteredConversations.map(
                                (conversation) => (
                                    <ConversationCard
                                        key={
                                            conversation.id
                                        }
                                        conversation={
                                            conversation
                                        }
                                    />
                                )
                            )}

                        </div>

                    )}

                </>
            )}

        </div>
    );
};


// ========================================
// Conversation Card
// ========================================

const ConversationCard = ({
    conversation,
}) => {

    const { user: currentUser } = useAuth();

    const item =
        conversation.item || null;

    const itemName =
        item?.name ||
        conversation.item_name ||
        "Marketplace item";

    const participants =
        conversation.participants || [];

    const otherParticipant =
        participants.find((p) => {
            const pName =
                typeof p === "string"
                    ? p
                    : p?.username || p?.name;

            const pId =
                typeof p === "object"
                    ? p?.id
                    : null;

            if (currentUser) {
                if (
                    pId &&
                    Number(pId) ===
                    Number(currentUser.id)
                ) {
                    return false;
                }

                if (
                    pName &&
                    pName === currentUser.username
                ) {
                    return false;
                }
            }

            return true;
        });

    const participant =
        conversation.other_user ||
        conversation.seller ||
        conversation.buyer ||
        otherParticipant ||
        participants[0] ||
        null;

    const participantName =
        typeof participant === "string"
            ? participant
            : participant?.username ||
              participant?.name ||
              "Marketplace user";

    const messages =
        conversation.messages || [];

    const lastMsgObj =
        messages[messages.length - 1];

    const lastMessage =
        conversation.last_message ||
        conversation.last_message_content ||
        lastMsgObj?.content ||
        "Start a conversation";

    const unread =
        conversation.unread_count ||
        conversation.unread_messages ||
        0;

    /*
     * Image should already be an absolute URL
     * if your Django serializer uses:
     *
     * request.build_absolute_uri(obj.image.url)
     */

    const image =
        item?.image ||
        item?.image_url ||
        item?.thumbnail ||
        null;

    return (
        <Link
            to={`/conversations/${conversation.id}`}
            className="conversation-card"
        >

            {/* Image */}

            <div className="conversation-card-avatar">

                {image ? (

                    <img
                        src={image}
                        alt={itemName}
                        onError={(e) => {
                            e.currentTarget.style.display =
                                "none";
                        }}
                    />

                ) : (

                    <UserCircleIcon />

                )}

            </div>


            {/* Content */}

            <div className="conversation-card-content">

                <div className="conversation-card-top">

                    <h2>
                        {participantName}
                    </h2>

                    {unread > 0 && (
                        <span className="conversation-unread">
                            {unread}
                        </span>
                    )}

                </div>


                <span className="conversation-item-name">
                    {itemName}
                </span>


                <p>
                    {lastMessage}
                </p>

            </div>


            {/* Arrow */}

            <ArrowRightIcon
                className="conversation-card-arrow"
            />

        </Link>
    );
};

export default Conversations;