import api from "../lib/axios";

export const getAllEquipments = async () => {
  const response = await api.get("/equipments");
  return response.data;
};
