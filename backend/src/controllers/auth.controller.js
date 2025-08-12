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
    return res.status(409).json({
      message: "User already exists!",
    });
  }

  const hashedpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username: username,
    email: email,
    password: hashedpassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered sucessfully",
    user,
  });
}

async function getLoginController(req, res) {
  res.render("login");
}

async function postLoginController(req, res) {}

module.exports = {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
};
