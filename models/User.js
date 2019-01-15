const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
