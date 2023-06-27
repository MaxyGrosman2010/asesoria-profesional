const {param} = require('express-validator');

validateServiceById = [
    param('id').notEmpty().isInt().withMessage("Problem with the id send")
];

module.exports = validateServiceById;