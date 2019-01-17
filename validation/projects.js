const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProjectInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.type = !isEmpty(data.type) ? data.type : "";
  data.estimatedcost = !isEmpty(data.estimatedcost) ? data.estimatedcost : "";
  data.projectstartdate = !isEmpty(data.projectstartdate)
    ? data.projectstartdate
    : "";
  data.estimatedprojectenddate = !isEmpty(data.estimatedprojectenddate)
    ? data.estimatedprojectenddate
    : "";
  data.workorder = !isEmpty(data.workorder);

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.type)) {
    errors.type = "Project type field is required";
  }

  if (Validator.isEmpty(data.estimatedcost)) {
    errors.estimatedcost = "Estimated cost field is required";
  }

  if (Validator.isEmpty(data.projectstartdate)) {
    errors.projectstartdate = "Project start date field is required";
  }

  if (Validator.isEmpty(data.estimatedprojectenddate)) {
    errors.estimatedprojectenddate =
      "Estimated project end date field is required";
  }

  if (Validator.isEmpty(data.workorder)) {
    errors.workorder = "Work order number is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
