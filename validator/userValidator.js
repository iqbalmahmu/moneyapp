const validator = require("validator");

const validate = (user) => {
  let error = {};
  // check if the user name has provided
  if (!user.name) {
    error.name = `please provide a name`;
  }

  // check if the user email has provided

  if (!user.email) {
    error.email = `please provide an email address`;
  } else if (!validator.isEmail(user.email)) {
    error.email = `please provide an email address that is valid for this user`;
  }

  // check if the user password has provided
  if (!user.password) {
    error.password = `please provide a password `;
  }
  // check if the user confirmpassword is matches the password
  else if (user.password !== user.confirmpassword) {
    error.confirmpassword = `please provide a confirm password`;
  } else if (!/[A-Z]/.test(user.password) || !/[a-z]/.test(user.password)) {
    error.password = `please provide a password that contains at least one uppercase and lowercase letters`;
  }

  let isValid = Object.keys(error).length === 0;
  return {
    error,
    isValid,
  };
};

module.exports = validate;
