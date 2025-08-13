const express = require("express");
const {
  getRegisterController,
  postRegisterController,
  getLoginController,
  postLoginController,
  logoutUser,
} = require("../controllers/auth.controller");
const router = express.Router();

router
  .route("/register")
  .get(getRegisterController)
  .post(postRegisterController);

router.route("/login").get(getLoginController).post(postLoginController);
router.route("/logout").get(logoutUser);

module.exports = router;
