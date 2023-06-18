const Adoption = require("../models/adoptionModel");
const PetCategory = require("../models/petCategoryModel");
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
    if (addPetsadoptions.statu) {
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
    if (petsadoptions.statu) {
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
    if (petadoptions.statu) {
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
    if (petsadoptions.statu) {
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
    if (petadoptions.statu) {
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
    if (adoptionadoptions.statu) {
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

exports.addCategory = async (req, res) => {
  const { animal } = req.body;
  try {
    const newCategory = await new PetCategory({ animal: animal });
    await newCategory.save();
    return res.json({
      status: 200,
      message: "New animal added successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

exports.displayCategories = async (req, res) => {
  try {
    const animals = await PetCategory.find();
    if (animals) {
      return res.json({ status: 200, animals: animals });
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await PetCategory.findByIdAndDelete({ _id: id });
    if (category) {
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
