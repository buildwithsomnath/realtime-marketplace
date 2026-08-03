import api from "./axios";

// List Items
export const getItems = () => {
  return api.get("items/");
};

// Item Details
export const getItem = (id) => {
  return api.get(`items/${id}/`);
};

// Categories
export const getCategories = () => {
  return api.get("items/categories/");
};

// Create Item
export const createItem = (data) => {
  return api.post("items/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update Item
export const updateItem = (id, data) => {
  return api.put(`items/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Partial Update
export const patchItem = (id, data) => {
  return api.patch(`items/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Item
export const deleteItem = (id) => {
  return api.delete(`items/${id}/`);
};