const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dklthtpiy/image/upload/v1684616083/pet-adoption/profile/24-248253_user-profile-default-image-png-clipart-png-download_ypc02m.png",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
