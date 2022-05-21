const mongoose = require("mongoose");

const user = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique : true,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
  },
  profilePic: {
    type: String,
    default: "",
  },
  status: {
    type: Number,
    enum: [0, 1, 2], //  0 = inactive ,1=active, 2=block
    default: 0,
  },
  gender: {
    type: String,
    default: "",
  },
  userType: {
    type: Number,
    enum: [0, 1], //0 = admin ,1=user
    default: 1
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", user);
