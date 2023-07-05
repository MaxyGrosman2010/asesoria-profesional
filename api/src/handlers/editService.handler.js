const updateService = require('../controllers/updateService.controller');
const {validationResult} = require('express-validator');

const editService = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {id, name, price, description} = req.body;

        const updatedService = await updateService(id, name, price, description, req.file);
        const {type} = updatedService.TypeService[0];

        const result = {
            id: updatedService.id,
            name: updatedService.name,
            price: updatedService.price,
            description: updatedService.description,
            files: updatedService.files,
            typeService: type
        };

        return res.status(200).json(result);
    }catch(error){

        console.log(error);
        res.status(404).json(error);
    };
};

module.exports = editService;