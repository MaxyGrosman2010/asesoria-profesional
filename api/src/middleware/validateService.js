const {body} = require('express-validator');

const validateCreateServices = [
    body('idUser').notEmpty().withMessage('Problem with User id'),
    body('name').notEmpty().isString().withMessage('Problem with name send'),
    body('typeService').notEmpty().isString().withMessage('Problem with typeService send'),
    body('price').notEmpty().withMessage('Problem with Price send'),
    body('description').notEmpty().withMessage('Problem with description send')
];

module.exports = validateCreateServices;