const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../config/keys");

// Load validation middleware
const validateCustomerInput = require("../../validation/customer");

// Test route
router.get("/", (req, res) => res.json({ msg: "Customer route works" }));

module.exports = router;
