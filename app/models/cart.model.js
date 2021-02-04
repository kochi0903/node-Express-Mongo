const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
      attributes: {},
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cart = mongoose.model("Cart", cart);
