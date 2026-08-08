import api from "./axios";

// GET /api/conversations/
export const getConversations = () => {
    return api.get("conversations/");
};

// POST /api/conversations/create/
export const createConversation = (data) => {
    return api.post(
        "conversations/create/",
        data
    );
};

// GET /api/conversations/<id>/
export const getConversation = (id) => {
    return api.get(
        `conversations/${id}/`
    );
};

// DELETE /api/conversations/<id>/delete/
export const deleteConversation = (id) => {
    return api.delete(
        `conversations/${id}/delete/`
    );
};