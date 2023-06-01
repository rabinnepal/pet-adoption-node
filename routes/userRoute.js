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
// const upload = require("./../services/multerConfig");
const multer = require("multer");
const { storage } = require("../services/cloudinaryConfig");
const upload = multer({ storage });
const { isAuthenticated } = require("../middleware/Auth");

router.route("/register").post(register);
router.route("/login").post(logIn);
router.route("/pets").get(isAuthenticated, getAllPets);
router.route("/pet/:id").get(isAuthenticated, getSinglePet);
router
  .route("/profile-picture")
  .post(isAuthenticated, upload.single("image"), profilePicture);
router
  .route("/profile")
  .patch(isAuthenticated, editProfile)
  .get(isAuthenticated, getProfile);

router
  .route("/adoption")
  .post(isAuthenticated, upload.single("image"), adoptionForm);
module.exports = router;
