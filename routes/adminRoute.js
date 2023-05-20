const express = require("express");
const router = express.Router();
const {
  addPets,
  getAllPets,
  getSinglePet,
  updatePets,
  deletePets,
  getAllAdoptionForm,
  getSingleAdoptionForm,
} = require("../controllers/adminController");
const { multer, storage } = require("./../services/multerConfig");
// const upload = multer({ storage: storage });
const upload = require("./../services/multerConfig");

// pets api routes
router.route("/pets").post(upload.single("image"), addPets).get(getAllPets);
router.route("/pet/:id").get(getSinglePet).patch(updatePets).delete(deletePets);
// get adoption
router.route("/adoptions").get(getAllAdoptionForm);
router.route("/adoption/:id").get(getSingleAdoptionForm);

module.exports = router;
