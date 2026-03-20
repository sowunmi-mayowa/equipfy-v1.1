import { useQuery } from "@tanstack/react-query";
import {
  getAllEquipments,
  getAllEquipmentsCategories,
  getAllEquipmentsManufacturers,
  getEquipment,
  getFilterData,
} from "./service";

export const useGetAllEquipments = (params = {}) => {
  return useQuery({
    queryKey: ["equipments", params],
    queryFn: () => getAllEquipments(params),
    // keep the query enabled even if params is empty; caller can control
  });
};

export const useGetEquipment = (id) => {
  return useQuery({
    queryKey: ["equipment", id],
    queryFn: () => getEquipment(id),
    enabled: !!id, // Only run query if id is provided
  });
};

export const useGetAllEquipmentsCategories = () => {
  return useQuery({
    queryKey: ["equipmentsCategories"],
    queryFn: () => getAllEquipmentsCategories(),
  });
};

export const useGetAllEquipmentsManufacturers = () => {
  return useQuery({
    queryKey: ["equipmentsManufacturers"],
    queryFn: () => getAllEquipmentsManufacturers(),
  });
};

export const useGetEquipmentsByName = (name) => {
  return useQuery({
    queryKey: ["equipmentsByName", name],
    queryFn: () => getEquipmentsByName(name),
    enabled: !!name,
  });
};

export const useGetFilterData = (filter) => {
  return useQuery({
    queryKey: ["equipmentsFilterData", filter],
    queryFn: () => getFilterData(filter),
    enabled: !!filter,
  });
};
