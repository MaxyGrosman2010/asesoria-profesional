const { body, validationResult } = require("express-validator");

const validateSingUp = [
  body("name").notEmpty().withMessage("name es requerido"),
  body("password").notEmpty().withMessage("password es requerido"),
  // body("cellPhone")
  //   .notEmpty()
  //   .isNumeric()
  //   .withMessage("typeService es requerido"),
  body("email").notEmpty().isEmail().withMessage("description es requerido"),
  // body("isAdmin")
  //   .notEmpty()
  //   .isBoolean()
  //   .withMessage("description es requerido"),
  body("profilePict").notEmpty().isURL().withMessage("image es requerida"),
];

module.exports = { validateSingUp };