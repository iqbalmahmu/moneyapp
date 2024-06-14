const validator = require("validator");

const validate = (user) => {
  let error = {};
  if (!user.name) {
    error.name = `please provide a name`;
  }

  if (!user.email) {
    error.email = `please provide a email`;
  } else if (!validator.isEmail(user.email)) {
    error.email = `please provide a valid email`;
  }

  if (!user.password) {
    error.password = `please provide a password`;
  } else if (user.password < 8) {
    error.password = `please provide a password greater than 8 characters`;
  }

  if (!user.confirmPassword) {
    error.confirmPassword = `please provide a confirm password`;
  } else if (user.password !== user.confirmPassword) {
    error.confirmPassword = `password does not match please provide the exact password`;
  }

  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};

module.exports = validate;
