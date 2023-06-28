const createServiceController = require('../controllers/createService.controller');
const findTypeService = require('../controllers/findTypeService.controller');
const linkTypeserviceService = require('../controllers/linkTypeserviceService.controller');
const {validationResult} = require('express-validator');
const firebaseUploader = require('../config/firebase.config');

const createService = async(req, res) => {
    try{
    
    const errors = validationResult(req);

    if(!errors.isEmpty()) throw new Error(errors.throw());
    
    const {name, typeService, price, description, file} = req.body;
    
    const existTypeService = await findTypeService(typeService);

    const uploadPicture = await firebaseUploader(file);

    const newService = await createServiceController(name, price, description, uploadPicture);
    
    await linkTypeserviceService(existTypeService, newService);

    res.status(200).json(newService);
    
    }catch(error){
        res.status(422).json({error: "Incomplete Fields"});
    };
};

module.exports = createService;