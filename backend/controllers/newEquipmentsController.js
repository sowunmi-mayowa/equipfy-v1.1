const mongoose = require("mongoose");
const Equipment = require("../models/equipments-v2");

const getEquipments = async (req, res) => {
  try {
    const {
      category,
      manufacturer,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
      minHours,
      maxHours,
      minWeight,
      maxWeight,
      minLength,
      maxLength,
      search,
      sortBy = "createdAt",
      order = "desc",
      page = 1,
      limit = 12,
    } = req.query;

    const query = {};

    /* -------------------- FILTERS -------------------- */

    // Category (multiple allowed)
    if (category) {
      query.category = { $in: category.split(",") };
    }

    // Manufacturer (multiple allowed)
    if (manufacturer) {
      query.manufacturer = { $in: manufacturer.split(",") };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Year range
    if (minYear || maxYear) {
      query.year = {};
      if (minYear) query.year.$gte = Number(minYear);
      if (maxYear) query.year.$lte = Number(maxYear);
    }

    // Hours range
    if (minHours || maxHours) {
      query.hours = {};
      if (minHours) query.hours.$gte = Number(minHours);
      if (maxHours) query.hours.$lte = Number(maxHours);
    }

    // Weight range
    if (minWeight || maxWeight) {
      query.weight = {};
      if (minWeight) query.weight.$gte = Number(minWeight);
      if (maxWeight) query.weight.$lte = Number(maxWeight);
    }

    // Dimension filter (transport length)
    if (minLength || maxLength) {
      query["dimensions.transport_length_m"] = {};
      if (minLength)
        query["dimensions.transport_length_m"].$gte = Number(minLength);
      if (maxLength)
        query["dimensions.transport_length_m"].$lte = Number(maxLength);
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    /* -------------------- SORTING -------------------- */

    const sortOrder = order === "asc" ? 1 : -1;

    const allowedSortFields = ["price", "year", "hours", "weight", "createdAt"];

    const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";

    const sortOptions = { [sortField]: sortOrder };

    /* -------------------- PAGINATION -------------------- */

    const pageNumber = Math.max(Number(page), 1);
    const pageLimit = Math.min(Number(limit), 50); // prevent abuse
    const skip = (pageNumber - 1) * pageLimit;

    /* -------------------- DATABASE CALLS -------------------- */

    const [equipments, total] = await Promise.all([
      Equipment.find(query).sort(sortOptions).skip(skip).limit(pageLimit),
      Equipment.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageLimit);

    /* -------------------- RESPONSE -------------------- */

    res.status(200).json({
      success: true,
      data: equipments,
      pagination: {
        total,
        totalPages,
        currentPage: pageNumber,
        perPage: pageLimit,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getEquipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ mssg: "Equipment not found" });
  }

  const equipment = await Equipment.findById(id);

  if (!equipment) {
    return res.status(404).json({ mssg: "Equipment not found" });
  }

  res.status(200).json({ equipment });
};

const getEquipmentsByCategory = async (req, res) => {
  const { category } = req.params;

  const equipments = await Equipment.find({ category });

  res.status(200).json({ equipments });
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Equipment.distinct("category");
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllManufacturers = async (req, res) => {
  try {
    const manufacturers = await Equipment.distinct("manufacturer");
    res.status(200).json({ manufacturers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEquipmentsByName = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        success: false,
        error: "Name is required and must be a string",
      });
    }

    const equipments = await Equipment.find({
      name: { $regex: name, $options: "i" },
    });

    // return in same shape as getEquipments (data + success)
    return res.status(200).json({ success: true, data: equipments });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Quick filters endpoint mapping short slugs to queries/sorts
const getEquipmentsQuick = async (req, res) => {
  try {
    const { filter } = req.params;
    const limit = Math.min(Number(req.query.limit) || 12, 50);

    let query = {};
    let sort = { createdAt: -1 };

    switch ((filter || "").toString().toLowerCase()) {
      case "recent":
        // return most recently added
        sort = { createdAt: -1 };
        break;
      case "low-hours":
        // low hours below 2000
        query.hours = { $lte: 2000 };
        sort = { hours: 1 };
        break;
      case "condition-good":
        // condition field uses enum: Excellent, Good, Fair, Poor
        query.condition = "Good";
        sort = { createdAt: -1 };
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Unknown quick filter" });
    }

    const equipments = await Equipment.find(query).sort(sort).limit(limit);

    return res.status(200).json({ success: true, data: equipments });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  getEquipments,
  getEquipment,
  getEquipmentsByCategory,
  getAllCategories,
  getAllManufacturers,
  getEquipmentsByName,
  getEquipmentsQuick,
};
