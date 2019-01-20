const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys");

// Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load our models
const User = require("../../models/User");

// Create a test route
router.get("/test", (req, res) =>
  res.json({ msg: "Looks like this route is working" })
);

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.status(404).json(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login a user
// @access  Public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return req.status(404).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    // Check to see if the email provided is associated with a  User
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    // Create our payload object
    const payload = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname
    };

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Sign the token using jsonwebtoken
        jwt.sign(
          payload,
          key.secretOrKey,
          { expiresIn: "2h" },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password or email is incorrect";
        return res.status(404).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Gets current logged in user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      email: req.user.email
    });
  }
);

module.exports = router;
