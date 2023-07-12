const allService = require('../controllers/allService.controller');
const findUserById = require('../controllers/findUserById.controller')

const getAllServiceAdmin = async (req, res) => {
  try{

    const admin = await findUserById(req.id);

    if(!admin) return res.status(404).json({ message: 'The id of the user send is invalid' });

    if(!admin?.isAdmin) return res.status(404).json({message: "No tenes la autoridad para acceder a esta informacion"});

    const services = await allService();
    const result = services.map((service) => {
      const {id, name, price, description, files, TypeServices, user_id, isDeleted, 
        userIsDeleted} = service;
      const type = TypeServices.length > 0 ? TypeServices[0].type : null;

      return { id, name, price, description, files, user_id, typeService: type, isDeleted, 
        userIsDeleted };
    });

    return res.status(200).json(result);
  }catch(error){ res.status(404).json(error) };
};

module.exports = getAllServiceAdmin;