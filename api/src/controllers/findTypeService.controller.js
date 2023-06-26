const {TypeService} = require('../db');

const findTypeService = (typeService) => TypeService.findAll({where: {name: typeService}});

module.exports = findTypeService;