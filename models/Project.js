const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  name: {
    type: String,
    required: true
  },

  type: [
    {
      roofing: {
        type: Boolean
      },

      siding: {
        type: Boolean
      },

      electric: {
        type: Boolean
      },

      plumbing: {
        type: Boolean
      },

      hvac: {
        type: Boolean
      },

      general: {
        type: Boolean
      },

      other: {
        type: Boolean
      }
    }
  ],

  esimatedcost: {
    type: Number,
    required: true
  },

  customer: {
    type: Schema.Types.ObjectId,
    ref: "customers"
  },

  projectstartdate: {
    type: Date
  },

  estimatedprojectenddate: {
    type: Date
  }
});

module.exports = Project = mongoose.model("customers", ProjectSchema);
