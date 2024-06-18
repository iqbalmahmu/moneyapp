const User = require("./../model/userSchema");
const schemaValidator = require("./../validator/userValidator");
const bcrypt = require("bcrypt");

module.exports.login = (_req, res) => {
  let name = _req.body.name;
  let email = _req.body.email;
  let password = _req.body.password;
  res.status(200).json({
    message: `Welcome to ${name} and your email is ${email}`,
  });
  console.log(_req.body.password);
};

module.exports.register = (_req, res) => {
  let { name, email, password, confirmPassword } = _req.body;

  // Validate the user object
  let userValidator = schemaValidator({
    name,
    email,
    password,
    confirmPassword,
  });

  if (!userValidator.isValid) {
    return res.status(400).json(userValidator.error);
  }

  // Check if user already registered
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }

      // Hash the password
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // Create new user
          const newUser = new User({
            name,
            email,
            password: hashedPassword,
          });

          return newUser.save();
        })
        .then(() => {
          res.status(201).json({ message: "Successfully created new user" });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ message: `Server error: ${err.message}` });
        });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: `Server error: ${err.message}` });
    });
};
