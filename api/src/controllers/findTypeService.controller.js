const {TypeService} = require('../db');

const findTypeService = (typeService) => TypeService.findOne({where: {type: typeService}});

module.exports = findTypeService;