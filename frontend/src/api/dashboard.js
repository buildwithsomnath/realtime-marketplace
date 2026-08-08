import api from "./axios";

// Dashboard
export const getDashboard = () => {
    return api.get("dashboard/");
};

// My Items
export const getMyItems = () => {
    return api.get("dashboard/items/");
};

// Delete Item
export const deleteItem = (id) => {
    return api.delete(`items/${id}/`);
};