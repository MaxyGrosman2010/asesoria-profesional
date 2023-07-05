const serviceById = require('../controllers/serviceById.controller');
const { validationResult } = require('express-validator');

const getServiceById = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new Error(errors.throw());

    const { idService } = req.params;

    const service = await serviceById(idService);

    const { id, name, price, description, files, TypeServices, user_id } =
      service;
    const { type } = TypeServices[0];
    const result = { id, name, price, description, files, type, user_id };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(422).json(error);
  }
};

module.exports = getServiceById;
