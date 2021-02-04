const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const Brand = require("../controllers/brand.controller");

router.post("/createBrand", cors(), Brand.create);

router.post("/editBrand", cors(), Brand.edit);

router.get("/getAllBrand", cors(), Brand.findAll);

router.post("/deleteBrand", cors(), Brand.remove);

module.exports = router;
