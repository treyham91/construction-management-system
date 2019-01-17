const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys");

// Load validation middleware
const validateCustomerInput = require("../../validation/customer");

// Load Models
const Customer = require("../../models/Customer");

// Test route
router.get("/test", (req, res) => res.json({ msg: "Customer route works" }));

// @route   GET api/customer/all
// @desc    Gets all customers
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};
  Customer.find()
    .then(customer => {
      if (!customer) {
        errors.noCustomers = "No customers found";
        return res.status(400).json(errors);
      }
      res.json(customer);
    })
    .catch(err => res.status(404).json({ customer: errors.noCustomers }));
});

// @route   GET api/customer/:customer_id
// @desc    Gets all customers
// @access  Private
router.get(
  "/:customer_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    const customerEmail = req.body.email;
    Customer.findOne({ customerEmail })
      .then(customer => {
        if (!customer) {
          errors.noCustomer = "No Customer found";
          return res.status(404).json(errors);
        }

        res.json(customer);
      })
      .catch(
        err => (err, res),
        res.json({ customer: "No customer was found with that email" })
      );
  }
);
module.exports = router;
