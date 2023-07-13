const {TypeService} = require('../db');

const allTypeServices = () => TypeService.findAll();

module.exports = allTypeServices;