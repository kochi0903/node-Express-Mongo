const mongoose = require("mongoose");
const Shipping = mongoose.model("Shipping");
siteURL = "http://111.93.169.90:4011/";
const path = require("path");
const multer = require("multer");
const excelToJson = require("convert-excel-to-json");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/shipping");
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

exports.upload = multer({
  storage: storage,
}).single("shippingFile");

exports.create = (req, res) => {
  const shipping = new Shipping({
    category: req.body.category,
    dataInJson: excelToJson({
      sourceFile: req.file.path,
      header: {
        rows: 1,
      },
      columnToKey: {
        A: "city",
        B: "township",
        B: "shippingFee",
      },
    }),
  });
  shipping
    .save()
    .then((result) => {
      res.status(201).send({ ack: 1, message: "Shipping Details added" });
    })
    .catch((err) => {
      res.status(500).send({
        ack: 0,
        error: err.message,
      });
    });
};

exports.findShippingDetails = (req, res) => {
  Shipping.find({ category: "Shipping" })
    .sort("-added_date")
    .then((data) => {
      res.status(200).send({ ack: 1, data: data[0] });
    })
    .catch((err) => {
      res.status(500).send({
        ack: 0,
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
