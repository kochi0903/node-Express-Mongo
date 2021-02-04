const mongoose = require("mongoose");
const Brand = mongoose.model("Brand");

exports.create = (req, res) => {
  var info = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Please Fill all details",
    });
  } else {
    Brand.find({ name: req.body.name })
      .exec()
      .then((brand) => {
        if (brand.length >= 1) {
          return res.status(201).send({
            message: "Brand exists",
          });
        } else {
          const brand = new Brand({
            name: info.name,
          });
          brand
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Brand sucessfully created",
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

  Brand.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
    .then((brand) => {
      if (!brand) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      return res.send({
        data: brand,
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
  Brand.find()
    .sort("-added_date")
    .then((brand) => {
      res.status(200).json(brand);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.remove = (req, res) => {
  Brand.aggregate([
    {
      $lookup: {
        from: "products", // collection name in db
        localField: "_id",
        foreignField: "brand",
        as: "common",
      },
    },
  ])
  .populate("productID")
    .then((brand) => {
      // res.status(200).json(brand);
      brand.map((data) => {
        if (data._id == req.body.id) {
          if (data.common.length >= 1) {
            return res.status(200).json({
              message: "A Product already exists for the brand",
            });
          } else {
            Brand.findByIdAndRemove(req.body.id).then((brand) => {
              return res.status(200).send({
                data: brand,
                message: "Deleted succesfully",
              });
            });
          }
        }
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};
