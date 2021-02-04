const mongoose = require("mongoose");

const user = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique : true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    default: "",
  },
  education: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  degree: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
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
  type: {
    type: Number,
    enum: [0, 1, 2], //0 = admin ,1=doctor, 2=patient
  },
  added_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("User", user);
