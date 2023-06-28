const {Service} = require('../db');

const updateService = (id, name, price, description, files) => 
    Service.update(
        {id: id},
        {where: {
            name: name, 
            price: price, 
            description: description, 
            files: files
        }
    }
);

module.exports = updateService;