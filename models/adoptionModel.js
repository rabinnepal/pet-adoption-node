const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adoptionSchema = new Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  age: { type: Number },
  phone: { type: String },
  petNameForAdoption: { type: String },
  doesOwnPets: { type: Boolean, default: false },
});

const Adoption = mongoose.model("Adoption", adoptionSchema);
module.exports = Adoption;
