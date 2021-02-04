const mongoose = require("mongoose");

const brand = new mongoose.Schema({
  name: {
    type: String,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Brand = mongoose.model("Brand", brand);
