const allService = require('../controllers/allService.controller');

const getAllService = async (req, res) => {
  try{

    const unfilter = await allService();


    const halfway = unfilter?.filter((service) => !service?.isDeleted);


    const services = halfway?.filter((service) => !service?.userIsDeleted);
    
    const result = services.map((service) => {

      const {id, name, price, description, files, TypeServices, user_id, isDeleted, userIsDeleted} = service;
      const type = TypeServices.length > 0 ? TypeServices[0].type : null;

      return {
        id, 
        name, 
        price, 
        description, 
        files, 
        user_id, 
        typeService: type, 
        isDeleted, 
        userIsDeleted 
      };
      
    });

    return res.status(200).json(result);

  }catch(error){

    res.status(404).json(error);
    
  };
};

module.exports = getAllService;