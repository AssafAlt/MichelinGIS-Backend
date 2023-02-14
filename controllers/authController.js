const User = require("../models/userModel");
const passport = require("passport");

const registerHandler = (req, res) => {
  const { username, password } = req.body;

  User.register({ username }, password, function (err, user) {
    if (err) {
      res.json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        return res
          .status(200)
          .json({ status: "Register Successfully", details: username });
      });
    }
  });
};

const loginHandler = (req, res) => {
  const user = new User({
    email: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      res.json(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        return res.status(200).json({
          user: user.email,

          status: "Login Successfully",
        });
      });
    }
  });
};

//logout
const logoutHandler = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    return res.send("Logout successfully");
  });
};

module.exports = { registerHandler, loginHandler, logoutHandler };
