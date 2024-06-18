const User = require("./../model/userSchema");
const schemaValidator = require("./../validator/userValidator");

module.exports.login = (_req, res) => {
  let name = _req.body.name;
  let email = _req.body.email;
  let password = _req.body.password;
  res.status(200).json({
    massage: `wellcome to ${name} and your email is ${email} and password is ${password}`,
  });
  console.log(_req.body.password);
};

module.exports.register = (_req, res) => {
  // validte the user object
  let userValidator = schemaValidator({
    name,
    email,
    password,
    confirmPassword,
  });
  // user input
  // user validation
  // user confirmation
};
