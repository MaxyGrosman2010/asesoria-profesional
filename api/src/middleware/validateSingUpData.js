const { body, validationResult } = require("express-validator");

const validateSingUp = [
  body("name").notEmpty().withMessage("name es requerido"),
  body("password").notEmpty().withMessage("password es requerido"),
  // body("cellPhone")
    // .notEmpty()
    //.isNumeric()
    // .withMessage("cellPhone es requerido"),
  body("email").notEmpty().withMessage("email es requerido"),
  // body("isAdmin")
  //   .notEmpty()
  //   .isBoolean()
  //   .withMessage("description es requerido"),
  // body("profilePict").notEmpty().withMessage("profilePict es requerida"),
];

module.exports = { validateSingUp };