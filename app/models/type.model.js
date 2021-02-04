const mongoose = require("mongoose");

const type = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Type = mongoose.model("Type", type);
