import api from "./axios";

// List Conversations
export const getConversations = () => {
  return api.get("conversations/");
};

// Start Conversation
export const createConversation = (data) => {
  return api.post("conversations/", data);
};

// Conversation Details
export const getConversation = (id) => {
  return api.get(`conversations/${id}/`);
};

// Delete Conversation
export const deleteConversation = (id) => {
  return api.delete(`conversations/${id}/`);
};

// Send Message
export const sendMessage = (conversationId, data) => {
  return api.post(
    `conversations/${conversationId}/messages/`,
    data
  );
};