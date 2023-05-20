const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  image: { type: String },
  name: { type: String },
  animal: { type: String },
  breed: { type: String },
  age: { type: Number },
  description: { type: String },
  isVaccinated: { type: Boolean, default: false },
});

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;
