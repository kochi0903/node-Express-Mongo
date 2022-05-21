const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("./app/models/user.model");
const userProfileRoute = require("./app/routes/user.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userProfileRoute);

app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Set up mongoose connection
let mongoDB = process.env.MONGODB_URI ;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;


db.on("connected", () => {
  console.log("info","connected to mongoDB");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(process.env.PORT || PORT, function () {
  console.info("Your node js server is running on port " + PORT);
});
