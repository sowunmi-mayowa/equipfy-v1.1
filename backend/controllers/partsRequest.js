const PartsRequest = require("../models/partsRequest");

const createPartsRequest = async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    machineType,
    partNumber,
    description,
    quantity,
    priority,
    message,
  } = req.body;

  if (!fullName || !machineType || !partNumber || !quantity) {
    return res
      .status(400)
      .json({ error: "Please fill in all required fields" });
  }

  try {
    const partsRequest = await PartsRequest.create({
      fullName,
      email,
      phoneNumber,
      machineType,
      partNumber,
      description,
      quantity,
      priority,
      message,
    });
    res.status(201).json(partsRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPartsRequest,
};
