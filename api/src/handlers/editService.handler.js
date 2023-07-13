const updateService = require('../controllers/updateService.controller');
const {validationResult} = require('express-validator');
const serviceById =  require('../controllers/serviceById.controller');

const editService = async(req, res) => {
    try{
        
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {id ,name, price, description} = req.body;

        await updateService(id, name, price, description, req.file);

        const updatedService = await serviceById(id);
        const {TypeServices} = updatedService;
        const {type} = TypeServices[0];
 
        const result = {
            id: updatedService?.id,
            name: updatedService?.name,
            price: updatedService?.price,
            description: updatedService?.description,
            files: updatedService?.files,
            typeService: type
        };

        return res.status(200).json(result);
    }catch(error){
        res.status(404).json(error);
    };
};

module.exports = editService;