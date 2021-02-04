const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
path = require("path");
router.use(cors());

const Product = require("../controllers/product.controller");
const ProductFilter = require("../controllers/productFilter");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      path.basename(file.originalname, path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.post(
  "/createProduct",
  cors(),
  upload.array("productPic", 4),
  Product.create
);

router.get("/getallProduct", cors(), Product.findAll);

router.get("/getallContactLens", cors(), Product.findContactLens);

router.get("/getallOpticalLens", cors(), Product.findOpticalLens);

router.get("/getallLensAccessory", cors(), Product.findLensAccessory);

router.get("/getallEyeWear", cors(), Product.findEyeWear);

router.post("/getProductbyID", cors(), Product.findOne);

router.post(
  "/editProductbyID",
  cors(),
  upload.array("productPic", 4),
  Product.edit
);

router.post("/countProductbyCategory", cors(), Product.countProduct);

router.post(
  "/contactLensFilterProduct",
  cors(),
  ProductFilter.filterContactLens
);

router.post(
  "/opticalLensFilterProduct",
  cors(),
  ProductFilter.filterOpticalLens
);

router.post(
  "/accessoryLensFilterProduct",
  cors(),
  ProductFilter.filterAccessoryLens
);

router.post(
  "/eyeWearLensFilterProduct",
  cors(),
  ProductFilter.filterEyeWearLens
);

router.post("/deleteProductbyID", cors(), Product.remove);

router.get("/searchProduct", cors(), Product.search);

module.exports = router;
