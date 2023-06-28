const updateService = require('../controllers/updateService.controller');
const {validationResult} = require('express-validator');

const editService = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {id, name, price, description} = req.body;

        const updatedService = await updateService(id, name, price, description, req.file);

        res.status(200).json(updatedService);

    }catch(error){

        console.log(error);
        res.status(404).json(error);
    };
};

module.exports = editService;