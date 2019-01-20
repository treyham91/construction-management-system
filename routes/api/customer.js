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

// @route   POST api/customer/create
// @desc    Creates a new customer
// @access  Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    } else {
      // Look for existing customers
      // We won't default to editing an existing customer, we will
      // create another route to handle updating customers
      const email = req.body.email;
      Customer.findOne({ email: email }).then(customer => {
        if (customer) {
          errors.exists = `A customer with ${req.body.email} already exists`;
          return res.status(404).json(errors);
        } else {
          const newCustomer = new Customer({
            firstname: req.user.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
          });
          newCustomer
            .save()
            .then(customer => res.json(customer))
            .catch(err => res.status(404).json(err));
        }
      });
    }
  }
);

module.exports = router;
