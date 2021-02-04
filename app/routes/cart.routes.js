const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());

const Cart = require("../controllers/cart.controller");

router.post("/addtoCart", cors(), Cart.create);

router.get("/getCartItemsbyUser", cors(), Cart.findbyUser);

router.post("/deleteCartItemsbyUser", cors(), Cart.remove);

module.exports = router;