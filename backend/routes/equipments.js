const express = require("express");
const { postEmail } = require("../controllers/emailController");
const {
  createEquipments,
  getEquipmentsCategory,
  getEquipmentsByName,
  getEquipmentsByHours,
  getEquipmentsByPrices,
} = require("../controllers/equipmentController");
const {
  getEquipments,
  getEquipment,
} = require("../controllers/newEquipmentsController");

const router = express.Router();

router.get("/equipments", getEquipments);

router.get("/equipment/:id", getEquipment);

router.get("/byCategory/:type", getEquipmentsCategory);

router.get("/byName/:name", getEquipmentsByName);

router.get("/byHours/:min/:max", getEquipmentsByHours);

router.get("/byPrice/:min/:max", getEquipmentsByPrices);

router.post("/", createEquipments);

router.post("/email", postEmail);

module.exports = router;
