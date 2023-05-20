const Pet = require("../models/petModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const ProfilePicture = require("../models/profilePictureModel");

exports.register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.json({ status: 400, message: "Please enter all fields" });
    }
    const user = await User.create({
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 10), //hashing the password
    });
    if (user) {
      return res.json({
        status: 200,
        message: "User registered successfully!!",
      });
    } else {
      return res.json({ status: 400, message: "User not registered!!" });
    }
  } catch (error) {
    if (error) {
      res.json({
        status: 400,
        message: error.message,
      });
    }
  }
};

exports.logIn = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.json({ status: 400, message: "Please enter all fields" });
  }

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!identifier) {
    return res.json({ status: 400, message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.json({ status: 400, message: "Invalid credentials" });
  }

  return res.json({
    status: 200,
    message: "Login successful",
    token: user._id,
    user,
  });
};
exports.profilePicture = async (req, res) => {
  try {
    const image = await cloudinary.uploader.upload(req.file.path, {
      folder: "pet-adoption/profile",
    });
    const profilePicture = await ProfilePicture.findByIdAndUpdate({ _id });
    //     {
    //   image: image.secure_url,
    // }

    if (profilePicture) {
      return res.json({
        status: 200,
        message: "Profile picture updated successfully",
      });
    } else {
      return res.json({
        status: 200,
        message: "Profile picture update failed",
      });
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

exports.editProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req._id);
    if (user) {
      return res.json({ status: 200, message: "Profile updated successfully" });
    } else {
      return res.json({ status: 400, message: "Profile update failed" });
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
exports.getProfile = async (req, res) => {
  const user = await User.findById(req._id);
  // .populate("reviews")
  // .select("-password");
  if (user) {
    return res.json({ status: 200, user });
  } else {
    return res.json({ status: 400, message: "User not found" });
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
exports.adoptionForm = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      age,
      phone,
      petNameForAdoption,
      doesOwnPets,
    } = req.body;
    if (
      !name ||
      !email ||
      !address ||
      !age ||
      !phone ||
      !petNameForAdoption ||
      !doesOwnPets
    ) {
      return res.json({ status: 400, message: "Please enter all fields" });
    }
    const adoptionForm = await User.create({
      name,
      email,
      address,
      age,
      phone,
      petNameForAdoption,
      doesOwnPets,
    });
    if (adoptionForm) {
      return res.json({
        status: 200,
        message: "Adoption process registered successfully!!",
      });
    } else {
      return res.json({
        status: 400,
        message: "Adoption process not registered!!",
      });
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
