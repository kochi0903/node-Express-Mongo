const mongoose = require("mongoose");

const shipping = new mongoose.Schema({
  category: {
    type: String,
    unique: true,
  },
  dataInJson: {
    type: Array,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Shipping = mongoose.model("Shipping", shipping);
