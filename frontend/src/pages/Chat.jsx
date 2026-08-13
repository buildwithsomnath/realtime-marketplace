import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "react-router-dom";

import {
    ArrowLeftIcon,
    PaperAirplaneIcon,
    UserCircleIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

import {
    getConversation,
    sendMessage,
} from "../api/conversations";

import useAuth from "../hooks/useAuth";

import "../styles/chat.css";


const Chat = () => {

    const { id } = useParams();

    const { user: currentUser } = useAuth();

    const [conversation, setConversation] =
        useState(null);

    const [messages, setMessages] =
        useState([]);

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [connectionStatus, setConnectionStatus] =
        useState("connecting");

    const socketRef =
        useRef(null);

    const messagesEndRef =
        useRef(null);


    // =====================================
    // GET JWT
    // =====================================

    const getAccessToken = () => {

        return (
            localStorage.getItem("access") ||
            localStorage.getItem("access_token") ||
            localStorage.getItem("accessToken")
        );

    };


    // =====================================
    // LOAD CONVERSATION
    // =====================================

    useEffect(() => {

        let cancelled = false;

        const loadConversation = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await getConversation(id);

                if (cancelled) {
                    return;
                }

                const data =
                    response.data;

                setConversation(data);

                setMessages(
                    data.messages ||
                    data.results ||
                    []
                );

            } catch (err) {

                console.error(
                    "CONVERSATION ERROR:",
                    err.response?.data || err
                );

                if (!cancelled) {

                    setError(
                        err.response?.data?.detail ||
                        "Unable to load conversation."
                    );

                }

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        };

        loadConversation();

        return () => {
            cancelled = true;
        };

    }, [id]);


    // =====================================
    // WEBSOCKET
    // =====================================

    useEffect(() => {

        if (!id) {
            return;
        }

        const token =
            getAccessToken();

        if (!token) {

            console.error(
                "No access token found."
            );

            setConnectionStatus(
                "error"
            );

            setError(
                "You are not authenticated."
            );

            return;
        }


        // -----------------------------
        // Development URL
        // -----------------------------

        const protocol =
            window.location.protocol === "https:"
                ? "wss:"
                : "ws:";

        const host =
            window.location.host;

        const wsUrl =
            `${protocol}//${host}` +
            `/ws/conversations/${id}/` +
            `?token=${encodeURIComponent(token)}`;


        console.log(
            "Connecting WebSocket:",
            wsUrl.replace(
                token,
                "***"
            )
        );


        const socket =
            new WebSocket(wsUrl);

        socketRef.current =
            socket;


        // -----------------------------
        // OPEN
        // -----------------------------

        socket.onopen = () => {

            console.log(
                "WebSocket connected."
            );

            setConnectionStatus(
                "connected"
            );

            setError("");

        };


        // -----------------------------
        // MESSAGE
        // -----------------------------

        socket.onmessage = (event) => {

            try {

                const data =
                    JSON.parse(
                        event.data
                    );

                console.log(
                    "WebSocket message:",
                    data
                );


                if (
                    data.type ===
                    "connection_established"
                ) {

                    setConnectionStatus(
                        "connected"
                    );

                    return;
                }


                if (
                    data.type ===
                    "message" ||
                    data.content ||
                    data.message
                ) {

                    const incoming =
                        data.message || data;

                    if (
                        !incoming ||
                        (!incoming.content &&
                         !incoming.message)
                    ) {
                        return;
                    }


                    setMessages(
                        (previous) => {

                            // Avoid duplicates
                            const exists =
                                previous.some(
                                    (msg) =>
                                        String(
                                            msg.id
                                        ) ===
                                        String(
                                            incoming.id
                                        )
                                );

                            if (exists) {
                                return previous;
                            }

                            return [
                                ...previous,
                                incoming,
                            ];

                        }
                    );

                }

            } catch (err) {

                console.error(
                    "WebSocket parse error:",
                    err
                );

            }

        };


        // -----------------------------
        // ERROR
        // -----------------------------

        socket.onerror = (event) => {

            console.error(
                "WebSocket error:",
                event
            );

            setConnectionStatus(
                "error"
            );

        };


        // -----------------------------
        // CLOSE
        // -----------------------------

        socket.onclose = (event) => {

            console.log(
                "WebSocket closed:",
                event.code,
                event.reason
            );

            setConnectionStatus(
                "disconnected"
            );

        };


        // -----------------------------
        // CLEANUP
        // -----------------------------

        return () => {

            console.log(
                "Closing WebSocket..."
            );

            socket.close();

            socketRef.current =
                null;

        };

    }, [id]);


    // =====================================
    // SCROLL
    // =====================================

    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    // =====================================
    // SEND
    // =====================================

    const handleSend = async (event) => {

        event.preventDefault();

        const text =
            message.trim();

        if (!text) {
            return;
        }


        const socket =
            socketRef.current;


        if (
            socket &&
            socket.readyState ===
                WebSocket.OPEN
        ) {

            socket.send(
                JSON.stringify({
                    type: "send_message",
                    content: text,
                })
            );

            setMessage("");
            setError("");
            return;
        }


        // Fallback to REST API when WS is not connected
        try {
            const response =
                await sendMessage(id, text);

            const newMsg =
                response.data;

            setMessages(
                (previous) => {
                    const exists =
                        previous.some(
                            (msg) =>
                                String(msg.id) ===
                                String(newMsg.id)
                        );

                    if (exists) {
                        return previous;
                    }

                    return [
                        ...previous,
                        newMsg,
                    ];
                }
            );

            setMessage("");
            setError("");

        } catch (err) {

            console.error(
                "Failed to send message via REST:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Failed to send message."
            );

        }

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (
            <div className="chat-state">

                <div className="chat-spinner" />

                <p>
                    Loading conversation...
                </p>

            </div>
        );

    }


    // =====================================
    // ERROR
    // =====================================

    if (!conversation) {

        return (
            <div className="chat-state">

                <h2>
                    Conversation unavailable
                </h2>

                <p>
                    {error ||
                        "This conversation could not be found."}
                </p>

                <Link
                    to="/conversations"
                    className="chat-back-button"
                >
                    <ArrowLeftIcon />
                    Back to conversations
                </Link>

            </div>
        );

    }


    // =====================================
    // PARTICIPANT
    // =====================================

    const participants =
        conversation.participants ||
        [];

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
              "Marketplace User";


    // =====================================
    // ITEM
    // =====================================

    const item =
        conversation.item ||
        null;


    // =====================================
    // RENDER
    // =====================================

    return (

        <div className="chat-page">


            {/* HEADER */}

            <header className="chat-header">

                <Link
                    to="/conversations"
                    className="chat-back"
                >
                    <ArrowLeftIcon />
                </Link>


                <div className="chat-user-avatar">
                    <UserCircleIcon />
                </div>


                <div className="chat-user-info">

                    <h1>
                        {participantName}
                    </h1>

                    {item && (
                        <Link
                            to={`/items/${item.id}`}
                            className="chat-item-link"
                        >
                            {item.name ||
                                item.title ||
                                "Marketplace item"}
                        </Link>
                    )}

                </div>


                <div
                    className={`chat-connection-status ${connectionStatus}`}
                >
                    {connectionStatus ===
                    "connected"
                        ? "Online"
                        : connectionStatus ===
                          "connecting"
                        ? "Connecting..."
                        : "Offline"}
                </div>


                <button
                    type="button"
                    className="chat-more-button"
                >
                    <EllipsisVerticalIcon />
                </button>

            </header>


            {/* ERROR */}

            {error && (

                <div className="chat-error">
                    {error}
                </div>

            )}


            {/* ITEM */}

            {item && (

                <Link
                    to={`/items/${item.id}`}
                    className="chat-item-banner"
                >

                    <div className="chat-item-image">

                        {(
                            item.image ||
                            item.image_url ||
                            item.thumbnail
                        ) ? (

                            <img
                                src={
                                    item.image ||
                                    item.image_url ||
                                    item.thumbnail
                                }
                                alt={
                                    item.name ||
                                    item.title ||
                                    "Item"
                                }
                            />

                        ) : (

                            <div>
                                No image
                            </div>

                        )}

                    </div>


                    <div className="chat-item-details">

                        <span>
                            Item
                        </span>

                        <strong>
                            {item.name ||
                                item.title ||
                                "Marketplace item"}
                        </strong>

                        {item.price !==
                            undefined &&
                            item.price !== null && (

                            <b>
                                ₹
                                {Number(
                                    item.price
                                ).toLocaleString(
                                    "en-IN"
                                )}
                            </b>

                        )}

                    </div>

                </Link>

            )}


            {/* MESSAGES */}

            <main className="chat-messages">

                {messages.length === 0 ? (

                    <div className="chat-empty">

                        <div className="chat-empty-icon">
                            <PaperAirplaneIcon />
                        </div>

                        <h2>
                            Start the conversation
                        </h2>

                        <p>
                            Send a message to{" "}
                            {participantName}
                            {" "}about this item.
                        </p>

                    </div>

                ) : (

                    messages.map(
                        (msg) => {

                            const senderUsername =
                                typeof msg.sender === "string"
                                    ? msg.sender
                                    : msg.sender?.username ||
                                      msg.sender_username;

                            const senderId =
                                msg.sender_id ||
                                (typeof msg.sender === "object"
                                    ? msg.sender?.id
                                    : null);

                            const mine =
                                msg.is_mine ||
                                msg.sender_is_me ||
                                (currentUser &&
                                 senderId &&
                                 Number(senderId) ===
                                 Number(currentUser.id)) ||
                                (currentUser &&
                                 senderUsername &&
                                 senderUsername ===
                                 currentUser.username);


                            const content =
                                msg.content ||
                                msg.message ||
                                "";


                            const time =
                                msg.created_at
                                    ? new Date(
                                        msg.created_at
                                    ).toLocaleTimeString(
                                        "en-IN",
                                        {
                                            hour:
                                                "numeric",
                                            minute:
                                                "2-digit",
                                        }
                                    )
                                    : "";


                            return (

                                <div
                                    key={
                                        msg.id
                                    }
                                    className={
                                        `chat-message ${
                                            mine
                                                ? "chat-message-mine"
                                                : "chat-message-theirs"
                                        }`
                                    }
                                >

                                    <div className="chat-bubble">

                                        <p>
                                            {content}
                                        </p>

                                        {time && (

                                            <span>
                                                {time}
                                            </span>

                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )

                )}


                <div
                    ref={
                        messagesEndRef
                    }
                />

            </main>


            {/* COMPOSER */}

            <form
                className="chat-composer"
                onSubmit={
                    handleSend
                }
            >

                <input
                    type="text"
                    value={message}
                    onChange={(event) =>
                        setMessage(
                            event.target.value
                        )
                    }
                    placeholder="Write a message..."
                />


                <button
                    type="submit"
                    disabled={
                        !message.trim()
                    }
                >
                    <PaperAirplaneIcon />
                </button>

            </form>

        </div>

    );

};

export default Chat;