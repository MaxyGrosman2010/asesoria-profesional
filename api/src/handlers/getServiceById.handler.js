const serviceById = require('../controllers/serviceById.controller');
const { validationResult } = require('express-validator');
const { Review } = require('../db');


const getServiceById = async(req, res) => {
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) throw new Error(errors.throw());

        const {idService} = req.params;
        const service = await serviceById(idService);

        if(service?.isDeleted) return res.status(404).json({message: "The searched service doesn't exist"});
        if(service?.userIsDeleted) return res.status(404).json({message: "The searched service doesn't exist"});

        const { id, name, price, description, files, TypeServices, user_id } = service;
        const review = await Review.findAll({ where: { service_id: id } });
        const {type} = TypeServices[0];
        const result = {id, name, price, description, files, type, user_id, review};

        return res.status(200).json(result);
        
    }catch(error){ res.status(422).json(error) };
};

module.exports = getServiceById;