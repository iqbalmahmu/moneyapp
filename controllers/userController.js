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
  res.send(`please enter your email and password to register`);
  // user input
  // user validation
  // user confirmation
};
