const mongoose = require("mongoose");
const Banner = mongoose.model("Banner");
siteURL = "http://111.93.169.90:4011/";
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
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

exports.upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("pic");

exports.create = (req, res) => {
  const banner = new Banner({
    category: req.body.category,
    pic: siteURL + req.file.path,
  });
  banner
    .save()
    .then((result) => {
      res.status(201).send({ ack: 1, message: "Banner Created successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        ack: 0,
        error: err.message,
      });
    });
};

exports.findAll = (req, res) => {
  Banner.find()
    .sort("-added_date")
    .then((banner) => {
      res.status(200).send({ ack: 1, data: banner });
    })
    .catch((err) => {
      res.status(500).send({
        ack: 0,
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.findByCategory = (req, res) => {
  Banner.find({ category: req.body.category })
    .sort("-added_date")
    .then((banner) => {
      res.status(200).send({ ack: 1, data: banner });
    })
    .catch((err) => {
      res.status(500).send({
        ack: 0,
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.editBannerByID = (req, res) => {
  var info = req.body;

  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Content can not be empty",
    });
  }
  Banner.findByIdAndUpdate(
    req.body.id,
    { pic: siteURL + req.file.path },
    { new: true }
  )
    .then((banner) => {
      if (!banner) {
        return res.status(404).send({ ack: 0, message: "Not found" });
      } else {
        res.status(200).send({
          ack: 1,
          data: banner,
          message: "Pic updated succesfully",
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        ack: 0,
        message: err.message || "Error updating ",
      });
    });
};
