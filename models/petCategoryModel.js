const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  // write schemas here
  animal: {
    type: String,
  },
});

const PetCategory = mongoose.model("PetCategory", categorySchema);

module.exports = PetCategory;
