const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.json({ status: 400, message: "Please enter all fields" });
    }
    const user = await userModel.create({
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

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
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
