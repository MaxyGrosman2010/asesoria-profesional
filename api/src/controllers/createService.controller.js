const {Service} = require('../db');

const createServiceController = (name, price, description) => Service.create({
    name: name, price: price, description: description
});

module.exports = createServiceController;