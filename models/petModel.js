const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  image: { type: String },
  name: { type: String },
  animal: { type: String },
  breed: { type: String },
  age: { type: Number },
  description: { type: String },
});

module.exports = mongoose.model("Pet", petSchema);
