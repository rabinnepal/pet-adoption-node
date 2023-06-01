const Adoption = require("../models/adoptionModel");
const Pet = require("../models/petModel");
const { cloudinary } = require("../services/cloudinaryConfig");
const path = require("path");

exports.addPets = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const { name, animal, breed, age, description, isVaccinated } = req.body;
    const image = req.file.originalname;
    console.log(image);
    const addPets = await Pet.create({
      //   image: process.env.BACKEND_URL + "/" + req.file.filename,
      image: image,
      name,
      animal,
      breed,
      age,
      description,
      isVaccinated,
      users: userId,
    });
    if (addPets) {
      return res.json({ status: 200, message: "Pet created successfully" });
    } else {
      return res.json({ status: 400, message: "Pet not created" });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    if (pets) {
      return res.json({ status: 200, pets });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};
exports.getSinglePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (pet) {
      return res.json({ status: 200, pet });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};

exports.updatePets = async (req, res) => {
  try {
    const { id } = req.params;
    const pets = await Pet.findByIdAndUpdate(id);
    if (pets) {
      return res.json({ status: 200, message: "Pet Updated Successfully" });
    } else {
      return res.json({ status: 400, message: "Pet not updated" });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};
exports.deletePets = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findByIdAndDelete({ _id: id });
    if (pet) {
      return res.json({ status: 200, message: "Pet Deleted Successfully" });
    } else {
      return res.json({ status: 400, message: "Pet not deleted" });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};

exports.getAllAdoptionForm = async (req, res) => {
  try {
    const adoptions = await Adoption.find();
    if (adoptions) {
      return res.json({ status: 200, adoptions });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};
exports.getSingleAdoptionForm = async (req, res) => {
  try {
    const { id } = req.params;
    const adoption = await Adoption.findById(id);
    if (adoption) {
      return res.json({ status: 200, adoption });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err.message,
    });
  }
};
