const mongoose = require("mongoose");
const Cart = mongoose.model("Cart");

exports.create = (req, res) => {
  const user = req.body.user;
  const item = {
    product: req.body.product,
    quantity: req.body.quantity,
    attributes: req.body.attributes,
  };

  Cart.findOne({ user: user }).then((foundCart) => {
    if (foundCart) {
      let products = foundCart.items.map((item) => item.product + "");
      if (products.includes(item.product)) {
        Cart.findOneAndUpdate(
          {
            user: user,
            items: {
              $elemMatch: { product: item.product },
            },
          },
          {
            $inc: { "items.$.quantity": item.quantity },
          }
        )
          .exec()
          .then(() =>
            res.status(200).send({
              ack: 1,
              message: "Quantity Updated",
            })
          );
      } else {
        foundCart.items.push(item);
        foundCart.save().then(() =>
          res.status(200).send({
            ack: 1,
            message: "New Products Added to Cart",
          })
        );
      }
    } else {
      Cart.create({
        user: user,
        items: [item],
      })
        .then(() =>
          res.status(200).send({
            ack: 1,
            message: "Product Added to Cart",
          })
        )
        .catch((err) => {
          return res.status(500).send({
            ack: 0,
            message: err.message,
          });
        });
    }
  });
};

exports.findbyUser = (req, res) => {
  const user = req.query.user;
  Cart.findOne({ user: user })
    .then((product) => {
      if (product) res.status(200).json({ ack: 1, data: product });
      else res.status(200).json({ ack: 0, data: "No products" });
    })
    .catch((err) => {
      res.status(500).send({
        ack: 0,
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

exports.remove = (req, res) => {
  const user = req.body.user;
  Cart.findOne({ user: user }).then((foundCart) => {
    if (foundCart) {
      Cart.update(
        {},
        { $pull: { items: { product: req.body.productID } } },
        { multi: true }
      )
        .exec()
        .then((data) => {
          if (data.nModified != 0)
            res.status(200).send({
              ack: 1,
              message: "Item Deleted",
            });
          else {
            res.status(200).send({
              ack: 0,
              message: "No such Item ID found",
            });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            ack: 0,
            message: err.message,
          });
        });
    }
    else {
      return res.status(500).send({
        ack: 0,
        message: "No Such User Found in Cart Data",
      });
    }
  });
};
