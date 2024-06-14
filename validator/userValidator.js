const validator = require("validator");

const validate = (user) => {
  let error = {};
  if (!user.name) {
    error.name = `please enter a name`;
  }

  if (!user.email) {
    error.email = `please enter a email`;
  } else if (validator.isEmail(user.email)) {
    error.email = `please enter a valid email`;
  }

  if (!user.password) {
    error.password = `please enter a password`;
  } else if (user.password.length < 7) {
    error.password = `please enter a password too short`;
  }

  if (!user.confirmPassword) {
    error.password = `please provide a confirm password`;
  } else if (user.password !== user.confirmPassword) {
    error.password = `passwoed does not match, please inter the valid password`;
  }
};

module.exports = validate;
