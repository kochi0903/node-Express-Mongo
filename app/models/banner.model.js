const mongoose = require("mongoose");

const banner = new mongoose.Schema({
  pic: {
    type: String,
  },
  category: {
    type: String,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Banner = mongoose.model("Banner", banner);