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
    return res.status(400).json(validate.error);
  } else {
    User.findOne({ email })
      .then((existingUser) => {
        if (existingUser) {
          return res.status(500).json({ message: `User already registered` });
        }
        // create new user

        let newUser = User({
          email,
          name,
          password,
        });

        newUser
          .save()
          .then(() => {
            res.status(200).json({ message: `Successfully created new user` });
          })
          .catch((error) => {
            console.log(error.message);
            res.status(500).json({ message: `Error creating new user` });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "server error happened" });
      });
  }
};
