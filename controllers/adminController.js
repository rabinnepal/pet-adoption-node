const sendEmail = require("../middleware/nodeMailer");
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
    if (adoptionadoptions) {
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

exports.updateAdoptionStatus = async (req, res) => {
  try {
    const { adoptionId, status, email } = req.body;

    // Find the adoption request by ID
    const adoption = await Adoption.findById(adoptionId);

    if (!adoption) {
      return res.json({ status: 404, message: "Adoption request not found" });
    }

    // Update the status based on the admin's decision
    adoption.status = status;

    // Save the updated adoption request
    await adoption.save();
    let statusText = "";
    let subject = "";

    if (status === "accepted") {
      statusText = "Congratulations! Your adoption form has been accepted.";
      subject = subject;
    } else if (status === "rejected") {
      statusText =
        "We regret to inform you that your adoption form has been rejected.";
      subject = "Adoption Form Rejected";
    }
    await sendEmail({
      email,
      subject: "Adoption Form Submission Confirmation",
      text: `Dear Sir/Madam,\n\n${statusText}\n\nBest regards,\nYour Pet Adoption Team`,
    });
    return res.json({
      status: 200,
      message: "Adoption request updated successfully",
    });
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
