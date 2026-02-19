import api from "../lib/axios";

export const getAllEquipments = async () => {
  const response = await api.get("/equipments");
  return response.data;
};

export const getEquipmentsByCategory = async (type) => {
  const response = await api.get(`/equipments/byCategory/${type}`);
  return response.data;
};

export const getEquipment = async (id) => {
  const response = await api.get(`/equipment/${id}`);
  return response.data;
};
