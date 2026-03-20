import api from "../../lib/axios";

// Normalize API responses from the backend controller which now
// returns an object like: { success, data: [...], pagination: {...} }
const extractData = (response) => {
  if (!response) return response;
  // If backend wraps result in `data` (list or object), return it
  if (response.data && response.data.data !== undefined)
    return processLocations(response.data.data);
  // If backend returns a single equipment as `equipment`, return it
  if (response.data && response.data.equipment !== undefined)
    return processLocations(response.data.equipment);
  // Fallback to the raw response.data
  return processLocations(response.data);
};

// 36 Nigerian states (randomly assign one per equipment to override API location)
const NIGERIA_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const randomState = () =>
  NIGERIA_STATES[Math.floor(Math.random() * NIGERIA_STATES.length)];

// Cache mapping equipment id -> assigned state (persists while app runs)
const NIGERIA_STATE_CACHE = new Map();

const looksLikeEquipment = (obj) => {
  return (
    obj &&
    typeof obj === "object" &&
    (obj._id || obj.id || obj.name || obj.price)
  );
};

const assignStateForItem = (item) => {
  if (!item || typeof item !== "object") return item;
  const key = item._id || item.id;
  if (key) {
    if (NIGERIA_STATE_CACHE.has(key)) {
      return { ...item, seller_location: NIGERIA_STATE_CACHE.get(key) };
    }
    const s = randomState();
    NIGERIA_STATE_CACHE.set(key, s);
    return { ...item, seller_location: s };
  }
  // No stable id — just assign a random state (not cached)
  return { ...item, seller_location: randomState() };
};

const processLocations = (data) => {
  if (!data) return data;
  // If it's an array, only process when elements look like equipment objects
  if (Array.isArray(data)) {
    if (data.length === 0) return data;
    if (!looksLikeEquipment(data[0])) return data;
    return data.map((item) => assignStateForItem(item));
  }
  // If it's a single equipment object, override its seller_location
  if (typeof data === "object") {
    // Some endpoints return an object wrapper like { equipment: {...} }
    if (
      data.equipment &&
      typeof data.equipment === "object" &&
      looksLikeEquipment(data.equipment)
    ) {
      return { ...data, equipment: assignStateForItem(data.equipment) };
    }
    if (looksLikeEquipment(data)) {
      return assignStateForItem(data);
    }
    return data;
  }
  return data;
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

export const createContact = async (contactData) => {
  const response = await api.post("/contact", contactData);
  return extractData(response);
};

export const getFilterData = async (filter) => {
  const response = await api.get(`/equipments/quick/${filter}`);
  return extractData(response);
};
