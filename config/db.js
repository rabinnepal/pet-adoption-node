const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// Database connection
function mongoConnection(url) {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
      userModel.findOne({ role: "admin" }).then((admin) => {
        if (admin) {
          console.log("Admin already seeded");
          return;
        } else {
          userModel
            .create({
              name: "admin",
              email: "admin@gmail.com",
              password: bcrypt.hashSync("password", 10),
              role: "admin",
            })
            .then((admin) => {
              console.log("Admin seeded");
            });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = mongoConnection;
