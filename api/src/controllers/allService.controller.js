const {TypeService, Service} = require('../db');

const AllService = () => Service.findAll({

    include: [{model: TypeService, attributes: ['type'],
    through: {attributes: []}}]
    
});

module.exports = AllService;