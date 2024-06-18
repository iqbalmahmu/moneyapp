const registerValidator = require("./../validator/registerValidator");
const User = require("./../model/userSchema");
const bcrypt = require("bcrypt");

module.exports.login = (_req, res) => {
  let name = _req.body.name;
  let email = _req.body.email;
  let password = _req.body.password;
  res.status(200).json({
    massage: `wellcome to ${name} and your email is ${email} and password is ${password}`,
  });
  console.log(_req.body.password);
};

module.exports.register = async (_req, res) => {
  //   read client data from user
  // validate check
  // check for duplicates
  // new user object
  // save to database
  // response back with user object
  let { name, email, password, confirmPassword } = _req.body;

  let validate = registerValidator({ name, email, password, confirmPassword });

  if (!validate.isValid) {
    return res.status(401).json({ message: `user validation failed` });
  }

  try {
    const existingUser = await User.findOne({ email });
    res.status(404).json({ message: `user already registered` });

    // hashing password

    const hashadPassword = await bcrypt.hash(password, 12);

    // create new user

    const newUser = new User({ name, email, password: hashadPassword });

    await newUser.save();
    res.status(200).json({ message: `user create successfully` });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
