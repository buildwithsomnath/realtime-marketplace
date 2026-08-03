import api from "./axios";

// Dashboard Overview
export const getDashboard = () => {
  return api.get("dashboard/");
};

// My Items
export const getMyItems = () => {
  return api.get("dashboard/items/");
};