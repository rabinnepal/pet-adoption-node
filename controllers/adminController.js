const petModel = require("../models/petModel");

exports.addPets = async (req, res) => {
  try {
    const { name, animal, breed, age, description } = req.body;
    // const image = req.file.filename;
    const addPets = await petModel.create({
      image: process.env.BACKEND_URL + "/" + req.file.filename,
      name,
      animal,
      breed,
      age,
      description,
    });
    if (addPets) {
      return res.json({ status: 200, message: "Pet created successfully" });
    } else {
      return res.json({ status: 400, message: "Pet not created" });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err,
    });
  }
};

exports.getAllPets = async (res) => {
  try {
    const pets = await petModel.find();
    if (pets) {
      return res.json({ status: 200, pets });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err,
    });
  }
};

exports.updatePets = async (req, res) => {
  try {
    const id = req.params;
    const pets = await petModel.findByIdAndUpdate(id);
    if (pets) {
      return res, json({ status: 200, message: "Pet Updated Successfully" });
    } else {
      return res, json({ status: 400, message: "Pet not updated" });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err,
    });
  }
};
exports.deletePets = async (req, res) => {
  try {
    const id = req.params;
    const pets = await petModel.findByIdAndDelete(id);
    if (pets) {
      return res, json({ status: 200, message: "Pet Deleted Successfully" });
    } else {
      return res, json({ status: 400, message: "Pet not deleted" });
    }
  } catch (err) {
    console.log(err);
    res.json({
      status: 400,
      message: "Something went wrong",
      errorMessage: err,
    });
  }
};
