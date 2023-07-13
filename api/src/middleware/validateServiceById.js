const {param} = require('express-validator');

validateServiceById = [
    param('idService').notEmpty().isInt().withMessage("Problem with the id send")
];

module.exports = validateServiceById;