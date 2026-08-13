import api from "./axios";

export const getConversations = () => {
    return api.get("/conversations/");
};

export const getConversation = (id) => {
    return api.get(`/conversations/${id}/`);
};

export const createConversation = (itemId) => {
    return api.post("/conversations/", {
        item_id: Number(itemId),
    });
};

export const sendMessage = (conversationId, content) => {
    return api.post(
        `/conversations/${conversationId}/messages/`,
        {
            content,
        }
    );
};

export const toggleMessageReaction = (conversationId, messageId, emoji) => {
    return api.post(
        `/conversations/${conversationId}/messages/${messageId}/react/`,
        {
            emoji,
        }
    );
};