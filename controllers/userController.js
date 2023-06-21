const Pet = require("../models/petModel");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const ProfilePicture = require("../models/profilePictureModel");
const Adoption = require("../models/adoptionModel");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/nodeMailer");
// const sendEmail = require("../middleware/sendEmail");

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
      await sendEmail({
        email,
        subject: "Registration Confirmation",
        text: `Dear ${name},\n\nThank you for registering! We look forward to serving you.\n\nBest regards,\nYour Pet Adoption Team`,
      });
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
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
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
    token: token,
    user,
  });
};
exports.profilePicture = async (req, res) => {
  try {
    const id = req.params;
    const image = req.file.originalname;
    console.log(req.file);

    const profilePicture = await ProfilePicture.findByIdAndUpdate(id);
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
    const user = await User.findByIdAndUpdate(req.user._id);
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
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  if (user) {
    return res.json({ status: 200, user });
  } else {
    return res.json({ status: 400, message: "User not found" });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate("users", "-password");
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
    // if (
    //   !name ||
    //   !email ||
    //   !address ||
    //   !age ||
    //   !phone ||
    //   !petNameForAdoption ||
    //   !doesOwnPets
    // ) {
    //   return res.json({ status: 400, message: "Please enter all fields" });
    // }
    const adoptionForm = await Adoption.create({
      name,
      email,
      address,
      age,
      phone,
      petNameForAdoption,
      doesOwnPets,
      status: "pending",
    });
    if (adoptionForm) {
      await sendEmail({
        email,
        subject: "Adoption Form Submission Confirmation",
        text: `Dear ${name},\n\nThank you for submitting the adoption form. We will review your application and get back to you soon.\n\nBest regards,\nYour Pet Adoption Team`,
      });
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
