const { body } = require("express-validator");

const validateSingIn = [
  body("reviewDescription")
    .notEmpty()
    .withMessage("reviewDescription es requerido"),
];

module.exports = validateSingIn;
