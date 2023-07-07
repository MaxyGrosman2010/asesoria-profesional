const allService = require('../controllers/allService.controller');
const db = require('../db');

const getAllService = async (req, res) => {
  try{

    const services = await allService();
    
    const result = services.map((service) => {

      const {id, name, price, description, files, TypeServices, user_id} = service;
      const type = TypeServices.length > 0 ? TypeServices[0].type : null;

      return { id, name, price, description, files, user_id, typeService: type };
    });

    return res.status(200).json(result);

  }catch(error){

    res.status(404).json(error);
    
  };
};

module.exports = getAllService;