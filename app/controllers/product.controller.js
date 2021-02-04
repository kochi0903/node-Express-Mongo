const mongoose = require("mongoose");
const Product = mongoose.model("Product");
siteURL = "http://111.93.169.90:4011/";

exports.create = (req, res) => {
  var info = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Please Fill all details",
    });
  } else {
    Product.find({ name: req.body.name })
      .exec()
      .then((product) => {
        if (product.length >= 1) {
          return res.status(201).send({
            message: "Product already exists",
          });
        } else {
          const picArrayLocation = req.files.map((file) => {
            return siteURL + file.path;
          });
          const product = new Product({
            name: info.name,
            description: info.description,
            manufacturedBy: info.manufacturedBy,
            type: info.type,
            brand: info.brand,
            attributes: info.attributes,
            isFeatured: info.isFeatured,
            isTrending: info.isTrending,
            category: info.category,
            doctorDiscount: info.doctorDiscount,
            patientDiscount: info.patientDiscount,
            guestDiscount: info.guestDiscount,
            price: info.price,
            productPic: picArrayLocation,
          });
          product
            .save()
            .then((result) => {
              res.status(201).json({
                message: "Product sucessfully created",
                data: result,
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
  var info = req.body;

  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  const picArrayLocation = req.files.map((file) => {
    return siteURL + file.path;
  });
  if (req.files[0]) {
    console.log("FIles");
    Product.findByIdAndUpdate(
      req.body.id,
      {
        name: info.name,
        description: info.description,
        manufacturedBy: info.manufacturedBy,
        type: info.type,
        brand: info.brand,
        attributes: info.attributes,
        isFeatured: info.isFeatured,
        isTrending: info.isTrending,
        category: info.category,
        doctorDiscount: info.doctorDiscount,
        patientDiscount: info.patientDiscount,
        guestDiscount: info.guestDiscount,
        price: info.price,
        productPic: picArrayLocation,
      },
      { new: true }
    )
      .then((product) => {
        if (!product) {
          return res.status(404).send({
            message: "Not found",
          });
        }
        res.status(200).send({
          data: product,
          message: "Id updated succesfully",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Error updating ",
        });
      });
  } else {
    Product.findByIdAndUpdate(
      req.body.id,
      {
        name: info.name,
        description: info.description,
        manufacturedBy: info.manufacturedBy,
        type: info.type,
        brand: info.brand,
        attributes: info.attributes,
        category: info.category,
        doctorDiscount: info.doctorDiscount,
        patientDiscount: info.patientDiscount,
        guestDiscount: info.guestDiscount,
        isFeatured: info.isFeatured,
        isTrending: info.isTrending,
        price: info.price,
      },
      { new: true }
    )
      .then((product) => {
        console.log("No files");
        if (!product) {
          return res.status(404).send({
            message: "Not found",
          });
        }
        res.status(200).send({
          data: product,
          message: "Id updated succesfully",
        });
      })
      .catch((err) => {
        return res.status(500).send({
          message: err.message || "Error updating ",
        });
      });
  }
};

exports.findAll = (req, res) => {
  Product.find()
    .sort("-added_date")
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
};

exports.countProduct = (req, res) => {
  Product.find({ category: req.body.category })
    .then((product) => {
      res.status(200).json({ count: product.length });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.findOne = (req, res) => {
  Product.findById(req.body.id)
    .populate("manufacturedBy")
    .populate("type")
    .populate("brand")
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Product Found",
        });
      }
      res.send(product);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Product not found",
        });
      }
      console.error(err.message);
      return res.status(500).send({
        message: "Error Retrieving",
      });
    });
};

exports.findContactLens = (req, res) => {
  page = req.query.page;
  limit = req.query.limit;
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
};

exports.findOpticalLens = (req, res) => {
  page = req.query.page;
  limit = req.query.limit;
  Product.find({ category: "Optical Lens" })
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
};

exports.findLensAccessory = (req, res) => {
  page = req.query.page;
  limit = req.query.limit;
  Product.find({ category: "Lens Care and Accessory" })
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
};

exports.findEyeWear = (req, res) => {
  page = req.query.page;
  limit = req.query.limit;
  Product.find({ category: "Eye Wear" })
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
};

exports.remove = (req, res) => {
  Product.findByIdAndRemove(req.body.id)
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          message: "Not found",
        });
      }
      res.send({
        data: product,
        message: "Deleted succesfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error Deleting ",
      });
    });
};

// const queryVar = function (str) {
//   let q = str
//     .replace(/\r\n/g, "")
//     .replace(/^\s+|\s+$/, "")
//     .replace(/[^a-z\s]+/gi, "")
//     .replace(/\s+$/, "");

//   let parts = q.split(/\s/);
//   let terms = parts;
//   let query = { $and: [] };
//   terms.forEach((term) => {
//     let queryFrag = { title: { $regex: term, $options: "i" } };
//     query["$and"].push(queryFrag);
//   });
//   return query;
// };

exports.search = (req, res) => {
  // let searchQuery = queryVar(req.query.search);
  let searchQuery = req.query.search;

  Product.find({ name: new RegExp(searchQuery, 'i')})

    // Product.find({ $text: { $search: searchQuery, $caseSensitive: false } })
    .then((product) => {
      if (!product) {
        return res.status(404).send({
          ack: 0,
          message: "Not found",
        });
      }
      res.send({
        ack: 1,
        data: product,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        ack: 0,
        message: err.message,
      });
    });
};
