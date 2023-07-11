const { log } = require('handlebars');
const allService = require('../controllers/allService.controller');

const getAllService = async (req, res) => {
  try {
    const unfilter = await allService();

    const halfway = unfilter?.filter((service) => !service?.isDeleted);

    const services = halfway?.filter((service) => !service?.userIsDeleted);

    const result = services.map((service) => {
      const { id, name, price, description, files, TypeServices, user_id} =
        service;
      const type = TypeServices.length > 0 ? TypeServices[0].type : null;

      return { id, name, price, description, files, user_id, typeService: type };
      
    });

    return res.status(200).json(result);
  } catch (error) {
    console.log('error:', error);
    res.status(404).json(error);
  }
};

module.exports = getAllService;
