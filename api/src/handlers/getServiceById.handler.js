const serviceById = require('../controllers/serviceById.controller');
const {validationResult} = require('express-validator');

const getServiceById = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {idService} = req.params;

        const service = await serviceById(idService);

        const {id, name, price, description, files, TypeServices} = service;
        const {type} = TypeServices[0];
        const result = {id, name, price, description, files, typeService: type};

        res.status(200).json(result);
    }catch(error){
        res.status(422).json({error: "The id wasn't send properly"});
    }
};

module.exports = getServiceById;