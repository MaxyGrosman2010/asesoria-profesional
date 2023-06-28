const createServiceController = require('../controllers/createService.controller');
const findTypeService = require('../controllers/findTypeService.controller');
const linkTypeserviceService = require('../controllers/linkTypeserviceService.controller');
const {validationResult} = require('express-validator');
const findUserById = require('../controllers/findUserById.controller');
const linkServiceUser = require('../controllers/linkServiceUser.controller');

const createService = async(req, res) => {
    try{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) throw new Error(errors.throw());
    
    const {idUser ,name, typeService, price, description} = req.body;

    const existUser = await findUserById(idUser);

    if(!existUser) return res.status(404).json({message: "The id of the user send is invalid"});
    
    const existTypeService = await findTypeService(typeService);

    const newService = await createServiceController(name, price, description, req.file);
    
    await linkTypeserviceService(existTypeService, newService);

    await linkServiceUser(existUser, newService);

    res.status(200).json(newService);
    
    }catch(error){
        console.log(error);
        res.status(422).json(error);
    };
};

module.exports = createService;