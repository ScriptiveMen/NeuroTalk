const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    res.redirect("/auth/login");
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    res.redirect("/login");
  }
}

module.exports = { authUser };
