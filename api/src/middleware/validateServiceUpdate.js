const {body} = require('express-validator');

const validateUpdateServices = [
    body('name').notEmpty().isString().withMessage('Problem with name send'),
    body('price').notEmpty().withMessage('Problem with Price send'),
    body('description').notEmpty().withMessage('Problem with description send')
];

module.exports = validateUpdateServices;