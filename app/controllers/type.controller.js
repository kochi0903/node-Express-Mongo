const mongoose = require("mongoose");
const Type = mongoose.model("Type");
const path = require("path");

exports.create = (req, res) => {
  var info = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Please Fill all details",
    });
  } else {
    Type.find({ name: req.body.name })
      .exec()
      .then((type) => {
        if (type.length >= 1) {
          return res.status(201).send({
            message: "Type already exists",
          });
        } else {
          const type = new Type({
            name: info.name,
          });
          type
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Type sucessfully created",
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

  Type.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
    .then((type) => {
      if (!type) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      res.send({
        data: type,
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
  Type.find()
    .sort("-added_date")
    .then((type) => {
      res.status(200).json(type);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.remove = (req, res) => {
  Type.aggregate([
    {
      $lookup: {
        from: "products", // collection name in db
        localField: "_id",
        foreignField: "type",
        as: "common",
      },
    },
  ])
    .then((type) => {
      type.map((data) => {
        if (data._id == req.body.id) {
          if (data.common.length >= 1) {
            res.status(200).json({
              message: "A Product already exists for the type",
            });
          } else {
            Type.findByIdAndRemove(req.body.id).then((type) => {
              res.status(200).send({
                data: type,
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
