import api from "./axios";

// Get all items
export const getItems = () => {
    return api.get("items/");
};

// Get single item
export const getItem = (id) => {
    return api.get(`items/${id}/`);
};

// Create item
export const createItem = (data) => {
    return api.post("items/", data);
};

// Update item
export const updateItem = (id, data) => {
    return api.patch(`items/${id}/`, data);
};

// Delete item
export const deleteItem = (id) => {
    return api.delete(`items/${id}/`);
};

// Get categories
export const getCategories = () => {
    return api.get("items/categories/");
};