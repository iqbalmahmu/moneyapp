const validator = require("validator");

const validate = (user) => {
  let error = {};

  // logic goes here...
  if (!user.email) {
    error.email = `please enter your email`;
  } else if (!validator.isEmail(user.email)) {
    error.email = `please enter your valid email`;
  }

  if (!user.password) {
    error.password = `please enter your password`;
  }

  let isValid = Object.keys(error).length === 0;

  return {
    error,
    isValid,
  };
};

module.exports = validate;
