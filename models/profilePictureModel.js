const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profilePictureSchema = new Schema({
  image: { type: String },
});

const ProfilePicture = mongoose.model("ProfilePicture", profilePictureSchema);
module.exports = ProfilePicture;
