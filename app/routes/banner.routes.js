const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const multer = require("multer");
path = require("path");

const Banner = require("../controllers/banner.controller");

router.post("/createBanner", Banner.upload, cors(), Banner.create);

router.get("/getAllBanner", cors(), Banner.findAll);

router.post("/getBannerByCategory", cors(), Banner.findByCategory);

router.post("/editBannerByID", Banner.upload, cors(), Banner.editBannerByID);

module.exports = router;
