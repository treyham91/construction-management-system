const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },

  lastname: {
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

  date: {
    type: String,
    required: true,
    default: Date.now
  }
});

module.exports = Customer = mongoose.model("customers", CustomerSchema);
