const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },

  last_name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  address: {
    street: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    zip: {
      type: Number,
      required: true
    }
  },

  workorder: {
    type: Number,
    required: true
  },

  date: {
    type: String,
    required: true,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
