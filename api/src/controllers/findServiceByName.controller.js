const {Service} = require('../db');

const findServiceByName = (name) => Service.findOne({where: {name: name}});

module.exports = findServiceByName;