const express = require("express");
const router = express.Router();
const {
  addPets,
  getAllPets,
  getSinglePet,
  updatePets,
  deletePets,
} = require("../controllers/adminController");
const { multer, storage } = require("./../services/multerConfig");
// const upload = multer({ storage: storage });
const upload = require("./../services/multerConfig");

// pets api routes
router.route("/pets").post(upload.single("image"), addPets).get(getAllPets);
router.route("/pet/:id").get(getSinglePet).patch(updatePets).delete(deletePets);

module.exports = router;
