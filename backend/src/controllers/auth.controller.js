async function getRegisterController(req, res) {
  res.render("register");
}

async function postRegisterController(req, res) {}

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
