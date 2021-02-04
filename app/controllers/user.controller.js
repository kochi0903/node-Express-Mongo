const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const randomize = require("randomatic");
siteURL = "http://111.93.169.90:4011/";

// Register
exports.create = (req, res) => {
  var userInfo = req.body;
  if (!req.body) {
    return res.status(400).send({
      message: "Please Fill all details",
    });
  } else {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(201).send({
            message: "Mail exists",
          });
        } else {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(req.body.password, salt);
          const user = new User({
            fullName: userInfo.fullName,
            contactNo: userInfo.contactNo,
            email: userInfo.email,
            specialization: userInfo.specialization,
            password: hash,
            salt: salt,
            status: userInfo.status,
            type: userInfo.type,
          });
          user
            .save()
            .then((result) => {
              console.log(result); // info log
              res.status(201).json({
                message: "User sucessfully created",
              });
            })
            .catch((err) => {
              console.log(err); // to be modified
              res.status(500).json({
                error: err,
              });
            });
        }
      });
  }
};

//Login
exports.login = (req, res) => {
  User.find({ email: req.body.email, type: req.body.type })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(201).json({
          message: "User doesn't exist",
        });
      } else if (!bcrypt.compareSync(req.body.password, user[0].password)) {
        return res.status(201).json({
          message: "Wrong Password",
        });
      } else if (user[0].status === 0) {
        return res.status(201).json({
          message: "Account has not yet approved your request",
        });
      }

      const token = jwt.sign(
        {
          email: user[0].email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "7 days",
        }
      );
      return res.status(200).json({
        message: "Login successful",
        userDetails: user[0]._id,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

//Logout
exports.logout = (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(201).json({
          message: "Auth failed",
        });
      }

      const token = jwt.sign(
        {
          email: user[0].email,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1",
        }
      );
      return res.status(200).json({
        message: "Logout successful",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Retrieve and return all data except admin
exports.findAll = (req, res) => {
  var data = [];
  User.find()
    .sort("-added_date")
    .then((userProfile) => {
      userProfile
        .filter((data) => data.type !== 0)
        .map((fiteredPerson) => {
          data.push(fiteredPerson);
        });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving data.",
      });
    });
};

// Find with a Id
exports.findOne = (req, res) => {
  User.findById(req.body.userID)
    .then((userProfile) => {
      console.log(userProfile);
      if (!userProfile) {
        return res.status(404).send({
          message: "Profile not found with id " + req.body.userID,
        });
      }
      res.send(userProfile);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Profile not found with id " + req.body.userID,
        });
      }
      return res.status(500).send({
        message: "Error retrieving Profile with id " + req.body.userID,
      });
    });
};

// Update Status by the Id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "can not be empty",
    });
  }

  let adminID = mongoose.Types.ObjectId("5f3277c7b803560aa081887d");
  // Find and update it with the request body * that is admin _id*
  User.findById(adminID).then((admin) => {
    if (admin.type === 0) {
      User.findByIdAndUpdate(req.body.userID, {
        status: req.body.status,
      })
        .then((userProfile) => {
          let transporter = nodemailer.createTransport({
            service: "gmail",
            secure: false, // true for 465, false for other ports
            auth: {
              user: "noreply@cbnits.com", // generated ethereal user
              pass: "qwertyuiolp", // generated ethereal password
            },
          });

          let notificationMail = transporter.sendMail({
            to: userProfile.email, // the userID email
            subject: "Account Notification", // Subject line
            html: `<html><head><META http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
            <body style="margin: 0; padding: 0;">
                <div style="margin:0;padding:0">
                <span>Your Account Status has been changed by admin side</span>              
            </div>
            </body></html>`, // html body
          });
          if (!userProfile) {
            return res.status(404).send({
              message: "Profile not found with id " + req.body.userID,
            });
          }
          res.send({
            message: "Profile status changed ",
          });
        })
        .catch((err) => {
          if (err.kind === "ObjectId") {
            return res.status(404).send({
              message: "Profile not found with id " + req.body.userID,
            });
          }
          return res.status(500).send({
            message: "Error updating Profile with id " + req.body.userID,
          });
        });
    } else {
      return res.status(404).send({
        message: "Admin not found with id " + req.body.adminID,
      });
    }
  });
};

// Update a User Details identified by the userID in the request
exports.editProfile = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }

  // Find User and update it with the request body
  User.findByIdAndUpdate(
    req.body.userID,
    {
      fullName: req.body.fullName,
      dateOfBirth: req.body.dateOfBirth,
      contactNo: req.body.contactNo,
      specialization: req.body.specialization,
      education: req.body.education,
      degree: req.body.degree,
      address: req.body.address,
      gender: req.body.gender,
    },
    { new: true }
  )
    .then((user) => {
      console.log;
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.body.userID,
        });
      }
      res.send({
        data: user,
        message: "User with id " + req.body.userID + " updated succesfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "user not found with id " + req.body.userID,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.body.userID,
      });
    });
};

exports.imageUploadbyID = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "can not be empty",
    });
  }
  User.findByIdAndUpdate(
    req.body.userID,
    {
      profilePic: siteURL + req.file.path,
    },
    { new: true }
  ).then((user) => {
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.body.userID,
      });
    }
    res.send({
      message: "Image Uploaded succesfully",
    });
  });
};

exports.changePassword = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }

  User.findById(req.body.userID)
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(200).json({
          message: "User doesn't exist",
        });
      } else if (!bcrypt.compareSync(req.body.oldPassword, data.password)) {
        return res.status(200).json({
          message: "Wrong Password",
        });
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.newPassword, salt);
        User.findByIdAndUpdate(
          req.body.userID,
          {
            password: hash,
          },
          { new: true }
        )
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: "No Such User found",
              });
            }
            res.send({
              message: "User Password updated succesfully",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId") {
              return res.status(404).send({
                message: "user not found with id " + req.body.userID,
              });
            }
            return res.status(500).send({
              message: "Error updating user with id " + req.body.userID,
            });
          });
      }
    });
};

exports.forgotPassword = (req, res) => {
  var randomStr = randomize("Aa0", 6);
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(randomStr, salt);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "No Such User found",
        });
      }

      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: "noreply@cbnits.com", // generated ethereal user
          pass: "qwertyuiolp", // generated ethereal password
        },
      });
      const token = jwt.sign(
        {
          email: req.body.email,
        },
        process.env.JWT_RESET_PASSWORD,
        {
          expiresIn: "1 day",
        }
      );
      transporter.sendMail({
        to: req.body.email, // the userID email
        subject: "Account Notification", // Subject line
        html: `<html><head><META http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
    <body style="margin: 0; padding: 0;">
        <div style="margin:0;padding:0">
        <span>http://111.93.169.90:4012/resetPassword/?token=${token}&id=${user._id}</span>
    </div>
    </body></html>`, // html body
      });
      res.send({
        message: "Mail Sent succesfully",
      });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(500).send({
        message: "Error updating user ",
      });
    });
};

exports.resetPassword = (req, res, next) => {
  if (!req.body) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }

  User.findById(req.body.userID)
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(200).json({
          message: "User doesn't exist",
        });
      } else if (bcrypt.compareSync(req.body.password, data.password)) {
        return res.status(200).json({
          message: "Cant choose old Password",
        });
      } else {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);
        jwt.verify(req.body.token, process.env.JWT_RESET_PASSWORD, function (
          err,
          decoded
        ) {
          if (err) {
            return res.status(400).json({
              message: "Link Expired",
            });
          }
        });
        User.findByIdAndUpdate(
          req.body.userID,
          {
            password: hash,
          },
          { new: true }
        )
          .then((user) => {
            res.status(200).send({
              message: "User Password updated succesfully",
            });
          })
          .catch((err) => {
            if (err.kind === "ObjectId") {
              return res.status(404).send({
                message: "user not found with id " + req.body.userID,
              });
            }
            return res.status(500).send({
              message: "Error updating user with id " + req.body.userID,
            });
          });
      }
    });
};
