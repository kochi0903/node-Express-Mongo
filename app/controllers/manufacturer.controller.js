const mongoose = require("mongoose");
const Manufacturer = mongoose.model("Manufacturer");
const Product = mongoose.model("Product");
const path = require("path");

exports.create = (req, res) => {
  var info = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Please Fill all details",
    });
  } else {
    Manufacturer.find({ name: req.body.name })
      .exec()
      .then((manufacturer) => {
        if (manufacturer.length >= 1) {
          return res.status(201).send({
            message: "Manufacturer exists",
          });
        } else {
          const manufacturer = new Manufacturer({
            name: info.name,
          });
          manufacturer
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Manufacturer sucessfully created",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
  }
};

exports.edit = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }

  Manufacturer.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
    .then((manufacturer) => {
      if (!manufacturer) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      res.send({
        data: manufacturer,
        message: "Id updated succesfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error updating ",
      });
    });
};

exports.findAll = (req, res) => {
  Manufacturer.find()
    .sort("-added_date")
    .then((manufacturer) => {
      res.status(200).json(manufacturer);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.remove = (req, res) => {
  Manufacturer.aggregate([
    {
      $lookup: {
        from: "products", // collection name in db
        localField: "_id",
        foreignField: "manufacturedBy",
        as: "common",
      },
    },
  ])
    .then((manufacturer) => {
      // res.status(200).json(manufacturer);
      manufacturer.map((data) => {
        if (data._id == req.body.id) {
          if (data.common.length >= 1) {
            res.status(200).json({
              message: "A Product already exists for the Manufacture",
            });
          } else {
            Manufacturer.findByIdAndRemove(req.body.id).then((manufacturer) => {
              res.status(200).send({
                data: manufacturer,
                message: "Deleted succesfully",
              });
            });
          }
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
