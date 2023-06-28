const updateService = require('../controllers/updateService.controller');
const {validationResult} = require('express-validator');

const editService = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {id, name, price, description, files} = req.body;

        const updatedService = await updateService(id, name, price, description, files);

        res.status(200).json(updatedService);
    }catch(error){
        console.log(error);
        res.status(200).json(error);
    };
};

module.exports = editService;