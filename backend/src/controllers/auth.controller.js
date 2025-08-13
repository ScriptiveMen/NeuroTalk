const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {
  const { username, email, password } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (isUserExist) {
    return res.redirect("/auth/register");
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedpassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.redirect("/auth/login");
}

async function getLoginController(req, res) {
  res.render("login");
}

async function postLoginController(req, res) {
  const { usernameOremail, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: usernameOremail }, { username: usernameOremail }],
  });

  if (!user) {
    return res.redirect("/auth/login");
  }

  const ispasswordValid = await bcrypt.compare(password, user.password);
  if (!ispasswordValid) {
    return res.status(401).json({
      message: "Unauthorized user!",
    });
  }

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.redirect("/");
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  res.redirect("/auth/login");
}

module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
  logoutUser,
};
