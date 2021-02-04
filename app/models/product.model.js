const mongoose = require("mongoose");

const product = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  manufacturedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
    },
  ],
  type: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Type",
    },
  ],
  brand: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  ],
  attributes: {},
  category: {
    type: String,
    enum: [
      "Contact Lens",
      "Optical Lens",
      "Eye Wear",
      "Lens Care and Accessory",
    ],
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  productPic: [],
  doctorDiscount: {
    type: String,
  },
  patientDiscount: {
    type: String,
  },
  guestDiscount: {
    type: String,
  },
  price: {
    type: String,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

product.index({ name: "text" });

module.exports = Product = mongoose.model("Product", product);

Product.createIndexes();
