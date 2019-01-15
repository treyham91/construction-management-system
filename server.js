// Load middleware dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

// Load our api routes
const users = require("./routes/api/users");
const customer = require("./routes/api/customer");
const project = require("./routes/api/project");

const app = express();

// body-parser middleware
app.use(bodyparser.urlencoded({ extend: false }));
app.use(bodyparser.json());

const db = require("./config/keys").mongoURI;

// Create our MongoDB connection
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport Config - Strategy
// module.exports = passport from passport.js
require("./config/passport.js")(passport);

// Passport middleware
app.use(passport.initialize());

// Use Routes
app.use("/api/users", users);
app.use("/api/customer", customer);
app.use("/api/project", project);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
