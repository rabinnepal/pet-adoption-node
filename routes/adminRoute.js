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
  displayCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/adminController");
// const { multer, storage } = require("./../services/multerConfig");
// const upload = multer({ storage: storage });
// const upload = require("./../services/multerConfig");
const { isAuthenticated } = require("../middleware/Auth");
const multer = require("multer");
const { storage } = require("../services/cloudinaryConfig");
const upload = multer({ storage });

// pets api routes
router
  .route("/pets")
  .post(isAuthenticated, upload.single("image"), addPets)
  .get(isAuthenticated, getAllPets);
router
  .route("/pet/:id")
  .get(getSinglePet)
  .patch(isAuthenticated, updatePets)
  .delete(isAuthenticated, deletePets);
// get adoption
router.route("/adoptions").get(isAuthenticated, getAllAdoptionForm);
router.route("/adoption/:id").get(isAuthenticated, getSingleAdoptionForm);
router
  .route("/category")
  .post(isAuthenticated, addCategory)
  .get(isAuthenticated, displayCategories);
router.route("/category/:id").delete(isAuthenticated, deleteCategory);

module.exports = router;
