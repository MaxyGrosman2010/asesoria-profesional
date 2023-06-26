const {TypeService} = require('../db');

const createNewTypeService = (typeService) => TypeService.findOrCreate({where: {type: typeService}});

module.exports = createNewTypeService;