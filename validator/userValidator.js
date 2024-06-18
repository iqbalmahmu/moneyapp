const validator = require("validator");

const validate = (user) => {
  let error = {};
  return user.email;
};

const people = {
  name: "foysal",
  email: "foysal@gmail.com",
  password: "3387637",
  confirmPasswoed: "338763",
};

let result = validate(people);
console.log(result);
