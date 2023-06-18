const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
  req.userId = user._id;
  req.user = user;
  next();
};
