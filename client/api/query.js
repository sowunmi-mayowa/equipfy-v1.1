import { useQuery } from "@tanstack/react-query";
import { getAllEquipments } from "./service";

export const useGetAllEquipments = () => {
  return useQuery({
    queryKey: ["equipments"],
    queryFn: getAllEquipments,
  });
};
