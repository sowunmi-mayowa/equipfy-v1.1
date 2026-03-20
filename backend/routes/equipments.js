const express = require("express");
const { postEmail } = require("../controllers/emailController");
const {
  createEquipments,
  getEquipmentsCategory,
  getEquipmentsByHours,
  getEquipmentsByPrices,
} = require("../controllers/equipmentController");
const {
  getEquipments,
  getEquipment,
  getEquipmentsByCategory,
  getAllCategories,
  getAllManufacturers,
  getEquipmentsQuick,
  getEquipmentsByName,
} = require("../controllers/newEquipmentsController");
const { createContact } = require("../controllers/contact");

const router = express.Router();

router.get("/equipments", getEquipments);

router.get("/equipment/:id", getEquipment);
router.get("/equipments/category/:category", getEquipmentsByCategory);
router.get("/equipments/categories", getAllCategories);
router.get("/equipments/manufacturers", getAllManufacturers);
router.get("/equipments/:name", getEquipmentsByName);

// quick filters: /api/equipments/quick/:filter?limit=12
router.get("/equipments/quick/:filter", getEquipmentsQuick);

router.post("/contact", createContact);

router.get("/byCategory/:type", getEquipmentsCategory);

router.get("/byHours/:min/:max", getEquipmentsByHours);

router.get("/byPrice/:min/:max", getEquipmentsByPrices);

router.post("/", createEquipments);

router.post("/email", postEmail);

module.exports = router;
