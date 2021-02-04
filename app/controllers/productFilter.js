const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.filterContactLens = (req, res) => {
  var result = [];
  var page = req.query.page;
  var limit = req.query.limit;

  if (
    req.body.manufacturer !== "0" &&
    req.body.type !== "0" &&
    req.body.brand !== "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "manufacturedBy",
        match: { name: req.body.manufacturer },
        select: "name -_id",
      })
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Manufacturer All and others slected
  if (
    req.body.manufacturer === "0" &&
    req.body.type !== "0" &&
    req.body.brand !== "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("manufacturedBy")
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Manufacturer All - Type All - Brand Selected
  if (
    req.body.manufacturer === "0" &&
    req.body.type === "0" &&
    req.body.brand !== "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("manufacturedBy")
      .populate("type")
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Manufacturer All - Type Selected - Brand All
  if (
    req.body.manufacturer === "0" &&
    req.body.type !== "0" &&
    req.body.brand === "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("manufacturedBy")
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate("brand")
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Brand All - Type  and Manufacturer Selected

  if (
    req.body.manufacturer !== "0" &&
    req.body.type !== "0" &&
    req.body.brand === "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "manufacturedBy",
        match: { name: req.body.manufacturer },
        select: "name -_id",
      })
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate("brand")
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Type All -  Brand and Manufacturer Selected
  if (
    req.body.manufacturer !== "0" &&
    req.body.type === "0" &&
    req.body.brand !== "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "manufacturedBy",
        match: { name: req.body.manufacturer },
        select: "name -_id",
      })
      .populate("type")
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Type and Brand All - Manufacturer Selected

  if (
    req.body.manufacturer !== "0" &&
    req.body.type === "0" &&
    req.body.brand === "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "manufacturedBy",
        match: { name: req.body.manufacturer },
        select: "name -_id",
      })
      .populate("type")
      .populate("brand")
      .then((product) => {
        product
          .filter(
            (data) =>
              data.manufacturedBy.length != 0 &&
              data.type.length != 0 &&
              data.brand.length != 0
          )
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }
  if (
    req.body.manufacturer === "0" &&
    req.body.type === "0" &&
    req.body.brand === "0"
  ) {
    Product.find({ category: "Contact Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("manufacturedBy")
      .populate("type")
      .populate("brand")
      .then((product) => {
        res.status(200).json({ data: product, count: product.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }
};

/*
---------------------------------------------------Optical Lens---------------------------------------
*/

exports.filterOpticalLens = (req, res) => {
  var result = [];
  var page = req.query.page;
  var limit = req.query.limit;

  if (req.body.brand !== "0") {
    Product.find({ category: "Optical Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter((data) => data.brand.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  if (req.body.brand === "0") {
    Product.find({ category: "Optical Lens" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("brand")
      .then((product) => {
        res.status(200).json({ data: product, count: product.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }
};

/*
---------------------------------------------------Lens Accessory---------------------------------------
*/

exports.filterAccessoryLens = (req, res) => {
  var result = [];
  var page = req.query.page;
  var limit = req.query.limit;

  if (req.body.manufacturer !== "0") {
    Product.find({ category: "Lens Care and Accessory" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "manufacturedBy",
        match: { name: req.body.manufacturer },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter((data) => data.manufacturedBy.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  if (req.body.manufacturer === "0") {
    Product.find({ category: "Lens Care and Accessory" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("manufacturedBy")
      .then((product) => {
        res.status(200).json({ data: product, count: product.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }
};

/*
------------------------------------------Eye Wear------------------------------------------------------
*/

exports.filterEyeWearLens = (req, res) => {
  var result = [];
  var page = req.query.page;
  var limit = req.query.limit;

  if (req.body.type !== "0" && req.body.brand !== "0") {
    Product.find({ category: "Eye Wear" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter((data) => data.type.length != 0 && data.brand.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Type All - Brand Selected
  if (req.body.type === "0" && req.body.brand !== "0") {
    Product.find({ category: "Eye Wear" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("type")
      .populate({
        path: "brand",
        match: { name: req.body.brand },
        select: "name -_id",
      })
      .then((product) => {
        product
          .filter((data) => data.type.length != 0 && data.brand.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  // Type Selected - Brand All
  if (req.body.type !== "0" && req.body.brand === "0") {
    Product.find({ category: "Eye Wear" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: "type",
        match: { name: req.body.type },
        select: "name -_id",
      })
      .populate("brand")
      .then((product) => {
        product
          .filter((data) => data.type.length != 0 && data.brand.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }

  //Type and Brand All
  if (req.body.type === "0" && req.body.brand === "0") {
    Product.find({ category: "Eye Wear" })
      .sort("-added_date")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("type")
      .populate("brand")
      .then((product) => {
        product
          .filter((data) => data.type.length != 0 && data.brand.length != 0)
          .map((filteredProduct) => {
            result.push(filteredProduct);
          });
        res.status(200).json({ data: result, count: result.length });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving data.",
        });
      });
  }
};
