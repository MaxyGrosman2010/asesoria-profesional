const {Service} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const createServiceController = async(name, price, description, files) => {

    const uploadPicture = await firebaseUploader(files);
    
    const service = await Service.create({
    name: name, price: price, description: description, files: uploadPicture
    });

    return service;
};

module.exports = createServiceController;