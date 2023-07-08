const {TypeService, Service} = require('../db');

const AllService = () => Service.findAll({

    exclude: [{isDeleted: true, userIsDeleted: true}],
    include: [{
        model: TypeService, 
        attributes: ['type'],
    through: {attributes: []}}],
    
    
});

module.exports = AllService;