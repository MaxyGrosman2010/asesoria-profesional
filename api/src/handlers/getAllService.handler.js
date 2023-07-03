const allService = require('../controllers/allService.controller');
const db = require('../db');

const getAllService = async (req, res) => {
  const services = await allService({
    include: [{ model: db.TypeService, through: 'TypesOfService' }],
  });

  const result = services.map((service) => {
    const { id, name, price, description, files, TypeServices } = service;
    const type = TypeServices.length > 0 ? TypeServices[0].type : null;

    return { id, name, price, description, files, typeService: type };
  });

  res.status(200).json(result);
};

module.exports = getAllService;
