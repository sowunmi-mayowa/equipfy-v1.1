import { useQuery } from "@tanstack/react-query";
import { getAllEquipments, getEquipmentsByCategory } from "./service";

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
