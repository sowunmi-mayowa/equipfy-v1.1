const mongoose = require("mongoose");
const equipments = require("../models/equipments-v2");

const getEquipments = async (req, res) => {
  try {
    const equipment = await equipments.find({}).sort({ createdAt: -1 });

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEquipment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ mssg: "Equipment not found" });
  }

  const equipment = await equipments.findById(id);

  if (!equipment) {
    return res.status(404).json({ mssg: "Equipment not found" });
  }

  res.status(200).json({ equipment });
};

module.exports = {
  getEquipments,
  getEquipment,
};
