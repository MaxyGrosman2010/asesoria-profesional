const {Service} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const updateService = async(id, name, price, description, files) => {
    const uploadPicture = firebaseUploader(files);

    const updated = await Service.update(
        {id: id},
        {where: {
            name: name, 
            price: price, 
            description: description, 
            files: uploadPicture
        }
    });

    return updated;
};

module.exports = updateService;