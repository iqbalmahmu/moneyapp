const registerValidator = require("./../validator/registerValidator");
const User = require("./../model/userSchema");

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
  //   read client data from user
  // validate check
  // check for duplicates
  // new user object
  // save to database
  // response back with user object
  let { name, email, password, confirmPassword } = _req.body;

  let validate = registerValidator({ name, email, password, confirmPassword });

  if (!validate.isValid) {
    res.status(400).json(validate.error);
  } else {
    User.findOne({ email })
      .then((user) => {
        console.log(user);
        if (user) {
          res.status(400).json({ message: `user already registered` });
        } else {
          user
            .save()
            .then(() =>
              res.status(200).json({ message: `user successfully registered` })
            )
            .catch((error) => {
              console.log(error.message);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "server error happened" });
      });
  }
};
