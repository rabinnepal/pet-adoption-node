const express = require("express");
const router = express.Router();
const {
  register,
  logIn,
  getAllPets,
  getSinglePet,
  profilePicture,
  editProfile,
  getProfile,
  adoptionForm,
} = require("../controllers/userController");
const upload = require("./../services/multerConfig");

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/pets").get(getAllPets);
router.route("/pet/:id").get(getSinglePet);
router.route("/profile-picture").patch(profilePicture);
router.route("/profile").patch(editProfile).get(getProfile);

router.route("/adoption").post(upload.single("image"), adoptionForm);
module.exports = router;
