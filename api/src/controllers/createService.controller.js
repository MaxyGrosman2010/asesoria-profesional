const { Service } = require('../db');
const firebaseUploader = require('../utils/firebaseUploader');

const createServiceController = async (
  User_id,
  name,
  price,
  description,
  files
) => {
  const uploadPicture = await firebaseUploader(files);

  const service = await Service.create({
    user_id: User_id,
    name: name,
    price: price,
    description: description,
    files: uploadPicture,
  });

  return service;
};

module.exports = createServiceController;
