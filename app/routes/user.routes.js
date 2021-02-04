const express = require("express");
const router = express.Router();
const cors = require("cors");
router.use(cors());
const multer = require("multer");
path = require("path");
const Userprofile = require("../controllers/user.controller");

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

router.post("/registerProfile", cors(), Userprofile.create);

router.post("/loginProfile", cors(), Userprofile.login);

router.post("/logoutProfile", cors(), Userprofile.logout);

router.post("/editProfile", cors(), Userprofile.editProfile);

router.post(
  "/imageUpload",
  cors(),
  upload.single("profilePic"),
  Userprofile.imageUploadbyID
);

router.get("/findAllProfile", cors(), Userprofile.findAll);

router.post("/findProfileByID", cors(), Userprofile.findOne);

router.post("/updateStatus", cors(), Userprofile.update);

router.post("/changePassword", cors(), Userprofile.changePassword);

router.post("/forgotPassword", cors(), Userprofile.forgotPassword);

router.post("/resetPassword", cors(), Userprofile.resetPassword);

// router.post('/deleteProfile',cors(), Userprofile.delete);

module.exports = router;
