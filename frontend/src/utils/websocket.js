// src/utils/websocket.js

const WS_BASE_URL = "ws://127.0.0.1:8000/ws/conversations";

export const createChatSocket = (conversationId) => {
    return new WebSocket(
        `${WS_BASE_URL}/${conversationId}/`
    );
};

export const sendMessage = (socket, message) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(
            JSON.stringify({
                message,
            })
        );
    }
};

export const closeSocket = (socket) => {
    if (socket) {
        socket.close();
    }
};