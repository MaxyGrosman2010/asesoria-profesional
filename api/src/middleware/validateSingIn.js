const { body } = require("express-validator");

const validateSingIn = [
  body("password").notEmpty().withMessage("password es requerido"),
  body("email").notEmpty().isEmail().withMessage("description es requerido"),
];

module.exports = validateSingIn ;
