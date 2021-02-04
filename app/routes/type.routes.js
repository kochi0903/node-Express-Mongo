const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const Type = require("../controllers/type.controller");

router.post("/createType", cors(), Type.create);

router.post("/editType", cors(), Type.edit);

router.get("/getAllType", cors(), Type.findAll);

router.post("/deleteType", cors(), Type.remove);

module.exports = router;