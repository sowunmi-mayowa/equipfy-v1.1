import api from "../../lib/axios";

// Normalize API responses from the backend controller which now
// returns an object like: { success, data: [...], pagination: {...} }
const extractData = (response) => {
  if (!response) return response;
  // If backend wraps result in `data` (list or object), return it
  if (response.data && response.data.data !== undefined)
    return response.data.data;
  // If backend returns a single equipment as `equipment`, return it
  if (response.data && response.data.equipment !== undefined)
    return response.data.equipment;
  // Fallback to the raw response.data
  return response.data;
};

export const getAllEquipments = async (params = {}) => {
  // Optional `params` should match backend query options:
  // { category, manufacturer, minPrice, maxPrice, minYear, maxYear,
  //   minHours, maxHours, minWeight, maxWeight, minLength, maxLength,
  //   search, sortBy, order, page, limit }
  const response = await api.get("/equipments", { params });
  return extractData(response);
};

export const getEquipment = async (id) => {
  const response = await api.get(`/equipment/${id}`);
  return extractData(response);
};

export const getAllEquipmentsCategories = async () => {
  const response = await api.get("/equipments/categories");
  return extractData(response);
};

export const getAllEquipmentsManufacturers = async () => {
  const response = await api.get("/equipments/manufacturers");
  return extractData(response);
};

export const getEquipmentsByName = async (name) => {
  const response = await api.get(`/equipments/${name}`);
  return extractData(response);
};
