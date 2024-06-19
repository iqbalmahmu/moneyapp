const registerValidator = require("./../validator/registerValidator");
const loginValidator = require("./../validator/loginValidator");
const User = require("./../model/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { serverError, resourceError } = require("./../utility/error");

module.exports.login = async (_req, res) => {
  // extracting data from request
  const { email, password } = _req.body;

  // validate user input
  let validate = loginValidator({ email, password });

  if (!validate.isValid) {
    return res.status(400).json(validate.error);
  }

  try {
    let existingUser = await User.findOne({ email });
    if (!existingUser) {
      return resourceError(res, `User not found`);
    }

    bcrypt.compare(password, existingUser.password, (error, result) => {
      if (error) {
        return serverError(error, res);
      }
      if (!result) {
        return resourceError(res, "Password does not match");
      }

      // generate token
      const token = jwt.sign(
        {
          _id: existingUser._id,
          email: existingUser.email,
          name: existingUser.name,
        },
        "your_jwt_secret", // Replace with your actual JWT secret key
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Login successful",
        token: `Bearer ${token}`,
      });
    });
  } catch (err) {
    serverError(err, res);
  }
};

module.exports.register = async (_req, res) => {
  let { name, email, password, confirmPassword } = _req.body;

  // validate user input
  let validate = registerValidator({ name, email, password, confirmPassword });

  if (!validate.isValid) {
    return res.status(400).json(validate.error);
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already registered" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // create new user
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    serverError(err, res);
  }
};
