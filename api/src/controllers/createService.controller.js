const {Service} = require('../db');

const createServiceController = (name, price, description, uploadPicture) => 
    Service.create({
    name: name, price: price, description: description, files: uploadPicture
});

module.exports = createServiceController;