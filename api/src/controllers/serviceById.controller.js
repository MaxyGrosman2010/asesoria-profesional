const {TypeService, Service} = require('../db');

const serviceById = (id) => Service.findByPk(id, 
    { include: [ { model: TypeService, attributes: ['type'], through: {attributes: []} } ] }
);

module.exports = serviceById;