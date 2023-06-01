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
      "https://res.cloudinary.com/dklthtpiy/image/upload/v1684665629/pets/933-9332131_profile-picture-default-png_vxoj6o.jpg",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
