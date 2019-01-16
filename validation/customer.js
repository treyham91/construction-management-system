const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCustomerInput(data) {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.zip = !isEmpty(data.zip) ? data.zip : "";
  data.workorder = !isEmpty(data.workorder) ? data.workorder : "";
};
