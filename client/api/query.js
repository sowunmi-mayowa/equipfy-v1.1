import { useQuery } from "@tanstack/react-query";
import {
  getAllEquipments,
  getEquipment,
  getEquipmentsByCategory,
} from "./service";

export const useGetAllEquipments = () => {
  return useQuery({
    queryKey: ["equipments"],
    queryFn: getAllEquipments,
  });
};

export const useGetEquipmentsByCategory = (type) => {
  return useQuery({
    queryKey: ["equipments", type],
    queryFn: () => getEquipmentsByCategory(type),
    enabled: !!type, // Only run query if type is provided
  });
};
export const useGetEquipment = (id) => {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getEquipment(id),
    enabled: !!id, // Only run query if id is provided
  });
};
