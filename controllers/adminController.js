const Pet = require("../models/petModel");
const { cloudinary } = require("../services/cloudinaryConfig");
const path = require("path");

exports.addPets = async (req, res) => {
  try {
    const { name, animal, breed, age, description, isVaccinated } = req.body;
    // const image = req.file.filename;
    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "pet-adoption/pets",
    });
    const addPets = await Pet.create({
      //   image: process.env.BACKEND_URL + "/" + req.file.filename,
      image: image.secure_url,
      name,
      animal,
      breed,
      age,
      description,
      isVaccinated,
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
