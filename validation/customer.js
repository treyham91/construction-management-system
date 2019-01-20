const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address1 = !isEmpty(data.address1) ? data.address1 : "";
  data.address2 = !isEmpty(data.address2) ? data.address2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";

  if (Validator.isEmpty(data.first_name)) {
    errors.firstname = "First name field is required";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.lastname = "Last name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email";
  }

  if (Validator.isEmpty(data.address1)) {
    errors.address1 = "Address field is required";
  }

  if (Validator.isEmpty(data.address2)) {
    errors.address2 = "Address field is required";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  if (Validator.isEmpty(data.zip)) {
    errors.zip = "ZIP field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
