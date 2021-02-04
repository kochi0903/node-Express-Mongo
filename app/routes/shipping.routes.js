const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
path = require("path");

const Shipping = require("../controllers/shipping.controller");

router.post("/uploadShippingData", Shipping.upload, cors(), Shipping.create);

router.get("/getallShippingData", cors(), Shipping.findShippingDetails);

module.exports = router;
