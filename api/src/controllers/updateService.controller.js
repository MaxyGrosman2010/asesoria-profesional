const {Service} = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const updateService = async(id, name, price, description, files) => {
    const uploadPicture = await firebaseUploader(files);

    const updated = await Service.update(
    { name: name, price: price, description: description, files: uploadPicture },
    { where: { id: id } } );

    return updated;
};

module.exports = updateService;