const {Service} = require('../db');

const createServiceController = (name, price, description, files) => Service.create({
    name: name, price: price, description: description, files: files
});

module.exports = createServiceController;