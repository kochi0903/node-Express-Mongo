const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const Manufacturer = require("../controllers/manufacturer.controller");

router.post("/createManufacturer", cors(), Manufacturer.create);

router.post("/editManufacturer", cors(), Manufacturer.edit);

router.get("/getAllManufacturer", cors(), Manufacturer.findAll);

router.post("/deleteManufacturer", cors(), Manufacturer.remove);


module.exports = router;