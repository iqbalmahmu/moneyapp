const express = require("express");
const { login, register } = require("./../controllers/userController");

const router = express.Router();

// registratin routes
// localhost:4000/api/users/register

router.post("/register", register);

// login route
// login url localhost:4000/api/login

router.post("/login", login);

module.exports = router;
