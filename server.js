const mongoose = require("mongoose");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const logger = require('./config/logger')
const app = express();
require("./app/models/user.model");
require("./app/models/manufacturer.model");
require("./app/models/brand.model");
require("./app/models/type.model")
require("./app/models/product.model")
require("./app/models/banner.model")
require("./app/models/cart.model")
require("./app/models/shipping.model")
const userProfileRoute = require("./app/routes/user.routes");
const manufacturerRoute = require("./app/routes/manufacturer.routes");
const brandRoute = require("./app/routes/brand.routes");
const typeRoute = require("./app/routes/type.routes");
const productRoute = require("./app/routes/product.routes");
const bannerRoute = require("./app/routes/banner.routes");
const cartRoute = require("./app/routes/cart.routes");
const shippingRoute = require("./app/routes/shipping.routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userProfileRoute);
app.use(manufacturerRoute);
app.use(brandRoute);
app.use(typeRoute);
app.use(productRoute);
app.use(bannerRoute);
app.use(cartRoute);
app.use(shippingRoute);

app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Set up mongoose connection
let mongoDB = process.env.MONGODB_URI ;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;

// console.log = function(){
//   return logger.info.apply(logger, arguments)
// }
// console.error = function(){
//   return logger.error.apply(logger, arguments)
// }

db.on("connected", () => {
  logger.log("info","connected to mongoDB");
});
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.listen(process.env.PORT || PORT, function () {
  logger.info("Your node js server is running on port " + PORT);
});
